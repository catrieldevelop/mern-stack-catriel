export default (sequelize, { BOOLEAN, STRING, UUID, UUIDV4 }) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: UUID,
            defaultValue: UUIDV4()
        },
        username: {
            type: STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: "El nombre de usuario solo acepta valores alfanumericos"
                },
                len: {
                    args: [4, 20],
                    msg: "El nombre de usuario debe estar comprendido entre 4 y 20 caracteres"
                }
            }
        },
        password: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Debe ingresar un email valido"
                }
            }
        },
        active: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        privilege: {
            type: STRING,
            allowNull: false,
            defaultValue: "user"
        }
    })
    // Relaciones
    User.associate = models => {
        User.hasMany(models.Post, {
            foreignKey: {
                name: "userId",
                field: "user_id"
            },
            as: 'posts'
        })
    }

    return User
}