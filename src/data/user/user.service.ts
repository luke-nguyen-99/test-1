import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";
import { CreateUserDto, SetPointDto, UserDto } from "./user.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user')
        private model: Model<User & Schema>,
    ) { }

    async getAll() {
        return this.model.find().lean();
    }

    async getOne(id: string) {
        return this.model.findById(id).lean();
    }

    async create(input: CreateUserDto) {
        return this.model.create(input);
    }
    async update(id: string, input: UserDto) {
        const user = await this.model.findById(id);
        if (!user) throw new NotFoundException('User not found');

        const { email, role, name, phone, address, point } = input;
        let newRecord = { };
        if (!!email && email != user.email) newRecord['email'] = email;
        if (!!role && role != user.role) newRecord['role'] = role;
        if (!!name && name != user.name) newRecord['name'] = name;
        if (!!phone && phone != user.phone) newRecord['phone'] = phone;
        if (!!address && address != user.address) newRecord['address'] = address;
        if (!!point && point != user.point) newRecord['point'] = point;
        return this.model.create(input);
    }

    async setPoint(input: SetPointDto[]) {
        const query = [];
        input.forEach(e => {
            query.push(this.model.updateOne({ email: e.email }, { point: e.point }));
        })
        return await Promise.all(query);
    }

}