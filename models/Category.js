import mongoose from "mongoose";
import slugify from 'slugify';

mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
});

CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
});

const category = mongoose.model('category', CategorySchema);

export default category;