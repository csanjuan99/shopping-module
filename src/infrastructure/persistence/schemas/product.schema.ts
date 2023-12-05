import { Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  isFeatured: Boolean,
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProductSchemaName: string = 'Product';

const ProductSchema = {
  name: ProductSchemaName,
  schema
};
export { ProductSchema };
