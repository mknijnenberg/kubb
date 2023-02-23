import { OasBuilder } from '@kubb/swagger'
import type { FileResolver } from '@kubb/swagger'
import { nameSorter } from '@kubb/core'
import { print } from '@kubb/ts-codegen'

import { ImportsGenerator, TypeGenerator } from '../generators'

import type ts from 'typescript'
import type { Refs } from '../generators'

type Generated = { refs: Refs; name: string; type: ts.TypeAliasDeclaration }
type Config = {
  fileResolver?: FileResolver
  nameResolver?: (name: string) => string
  withJSDocs?: boolean
  withImports?: boolean
}
export class TypeBuilder extends OasBuilder<Config> {
  configure(config: Config) {
    this.config = config

    if (this.config.fileResolver) {
      this.config.withImports = true
    }

    return this
  }

  async print(name?: string) {
    const codes: string[] = []

    // TODO create another function that sort based on the refs(first the ones without refs)
    const refsSorter = (a: Generated, b: Generated) => {
      if (Object.keys(a.refs)?.length < Object.keys(b.refs)?.length) {
        return -1
      }
      if (Object.keys(a.refs)?.length > Object.keys(b.refs)?.length) {
        return 1
      }
      return 0
    }

    const generated = this.items
      .filter((gen) => (name ? gen.name === name : true))
      .sort(nameSorter)
      .map(({ schema, name, description }) => {
        const generator = new TypeGenerator(this.oas, { withJSDocs: this.config.withJSDocs, nameResolver: this.config.nameResolver })
        const type = generator.build(schema, this.config.nameResolver?.(name) || name, description)

        return {
          refs: generator.refs,
          name,
          type,
        }
      })
      .sort(refsSorter)

    generated.forEach((item) => {
      codes.push(print(item.type))
    })

    if (this.config.withImports) {
      const importsGenerator = new ImportsGenerator({ fileResolver: this.config.fileResolver })
      const codeImports = await importsGenerator.build(generated)

      if (codeImports) {
        codes.unshift(print(codeImports))
      }
    }

    return codes.join('\n')
  }
}
