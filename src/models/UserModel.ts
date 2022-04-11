import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from "typeorm";
import GroupModel from "./GroupModel";


@Entity()
export default class UserModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToMany(() => GroupModel, { cascade: true })
    @JoinTable({ name: "UserGroup" })
    groups: GroupModel[];
}
