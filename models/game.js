module.exports = (sequelize, DataTypes) => {
    return sequelize.define('game', {
      releaseDate: DataTypes.STRING,
      name: DataTypes.STRING,
      standaloneTitle: DataTypes.BOOLEAN,
      esrbRating: DataTypes.STRING,
      personalRating: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    });
};
