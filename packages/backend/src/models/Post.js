export default (sequelize, { BOOLEAN, STRING, TEXT, UUID, UUIDV4 }) => {
    const Post = sequelize.define('Post', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: UUID,
            defaultValue: UUIDV4()
        },
        title: {
            type: STRING,
            allowNull: false,
        },
        slug: {
            type: STRING,
            allowNull: false,
        },
        readingTime: {
            type: STRING,
            allowNull: false,
            defaultValue: "3min"
        },
        body: {
            type: TEXT,
            allowNull: false,
        },
        lang: {
            type: STRING,
            allowNull: false,
            defaultValue: "es"
        },
        image: {
            type: STRING
        },
        published: {
            type: BOOLEAN,
            allowNull: false,
        }
    })
    // Relaciones
    Post.associate = models => {
        Post.hasMany(models.Tag, {
            foreignKey: {
                name: "postId",
                field: "post_id"
            },
            as: "tags",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
    return Post
}