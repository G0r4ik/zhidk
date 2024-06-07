import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  'postgres://postgres.jnwbdqsksvgnwffekman:snmzx,.cm,.mzxcmzx@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
  // 'postgres://postgres.qinzkbufqazmlpgescyp:kinzhalov133@aws-0-us-east-1.pooler.supabase.com:5432/postgres'
)

export const Component = sequelize.define('component', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false },
  img: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false },
  total_count_item: { type: Sequelize.INTEGER, allowNull: false },
  release_date: { type: Sequelize.INTEGER, allowNull: false },
})

export const Cart = sequelize.define('cart', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.TEXT },
  count: { type: Sequelize.INTEGER },
  component_id: {
    type: Sequelize.INTEGER,
    references: { model: Component, key: 'id' },
  },
})

Component.hasMany(Cart, { foreignKey: 'component_id' })
Cart.belongsTo(Component, { foreignKey: 'component_id' })

// Component.sync({ alter: true })
// Cart.sync({ alter: true })
