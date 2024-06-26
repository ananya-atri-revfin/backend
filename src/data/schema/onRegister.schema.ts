import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

@Schema()
export class onRegister {

    @Prop({type: mongoose.Schema.Types.Number})
    _id: number;

    @Prop({ type: String, unique: true, required: true })
    email: string;

    @Prop({ type: String, default: "User123" })
    name: string;

    @Prop({ type: String, default: "Employee" })
    occupation: string;

    @Prop({ type: Boolean, default: false })
    isLogged: boolean;

    @Prop({ type: Date, default: () => Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: () => Date.now() })
    updatedAt: Date;
}
export const onRegisterSchema = SchemaFactory.createForClass(onRegister);