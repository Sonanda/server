'use strict';
module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        s_type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        s_region: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        s_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        access_token: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        refresh_token: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, 
    {
        timestamps: false
    });
};