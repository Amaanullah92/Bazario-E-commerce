import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../schema/product'
import { Category } from '../schema/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,Category],
}
