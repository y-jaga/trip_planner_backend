// An itinerary is a detailed plan or schedule of a journey, trip, or travel.
// It typically includes information about the places to visit,
// the dates and times of travel, accommodations, activities, and other arrangements.

module.exports = (sequelize, DataTypes) => {
  const itinerary = sequelize.define(
    "itinerary",
    {
      name: DataTypes.STRING,
    },
    { timestamps: true }
  );

  itinerary.associate = (models) => {
    itinerary.hasMany(models.itineraryItem, {
      foreignKey: "itineraryId",
    });
  };

  return itinerary;
};
