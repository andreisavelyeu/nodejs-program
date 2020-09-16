import { DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from './index';

export const GroupModel = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(
            DataTypes.ENUM({
                values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            })
        ),
        allowNull: false
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    }
});
