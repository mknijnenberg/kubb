[API](../../../packages.md) / [@kubb/plugin-oas](../index.md) / API

# API

```ts
type API: object;
```

## Type declaration

### contentType?

```ts
optional contentType: contentType;
```

### getBaseURL()

```ts
getBaseURL: () => Promise<string | undefined>;
```

#### Returns

`Promise`\<`string` \| `undefined`\>

### getOas()

```ts
getOas: (formatOptions?) => Promise<Oas>;
```

#### Parameters

• **formatOptions?**: `FormatOptions`

#### Returns

`Promise`\<[`Oas`](../../oas/classes/Oas.md)\>

### getSchemas()

```ts
getSchemas: (options?) => Promise<Record<string, SchemaObject>>;
```

#### Parameters

• **options?**: `Pick`\<`GetSchemasProps`, `"includes"`\>

#### Returns

`Promise`\<`Record`\<`string`, [`SchemaObject`](../../oas/type-aliases/SchemaObject.md)\>\>

## Defined in

[plugin-oas/src/types.ts:16](https://github.com/kubb-project/kubb/blob/dcebbafbee668a7722775212bce85eec29e39573/packages/plugin-oas/src/types.ts#L16)