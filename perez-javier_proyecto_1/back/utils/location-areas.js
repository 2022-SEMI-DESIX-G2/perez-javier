const setLocationAreas = (data) => {
    const locationList = data.map(({ location_area, version_details }) => {
        let counter = 0
        const { encounter_details } = version_details[counter];
        const location = location_area.name;
        const chance = encounter_details[counter].chance;
        const max_level = encounter_details[counter].max_level;
        const method = encounter_details[counter].method.name;
        counter++;
        return `<tr><td>${location}</td><td>${chance}%</td><td>${max_level}</td><td>${method}</td></tr>`
    });

    return locationList.join('');
}

module.exports = {
    setLocationAreas,
}