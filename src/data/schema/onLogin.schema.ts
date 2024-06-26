import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

@Schema()
export class onLogin {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: number;

    @Prop({ type: String, unique: true, required: true })
    email: string;

    @Prop({ type: String })
    otp: string;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Date, default: () => Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: () => Date.now() })
    updatedAt: Date;

    @Prop({ type: Number, default: 0})
    attempts: number
}
export const onLoginSchema = SchemaFactory.createForClass(onLogin);