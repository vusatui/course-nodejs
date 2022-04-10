import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from "typeorm";

import {
    Permission
} from "../services/GroupService/types"

@Entity({
    name: "Groups",
})
export default class GroupModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "text",
        array: true,
        default: [Permission.READ, Permission.SHARE]
    })
    permissions: Permission[];
}