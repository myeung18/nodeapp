
async function registerPerson(person) {
    const text = `
    INSERT INTO people (fullname, gender, phone, age)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
    const values = [person.fullname, person.gender, person.phone, person.age];
    return pool.query(text, values);
}

async function getPerson(personId) {
    const text = `SELECT * FROM people WHERE id = $1`;
    const values = [personId];
    return pool.query(text, values);
}

async function updatePersonName(personId, fullname) {
    const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
    const values = [personId, fullname];
    return pool.query(text, values);
}

async function removePerson(personId) {
    const text = `DELETE FROM people WHERE id = $1`;
    const values = [personId];
    return pool.query(text, values);
}


(async () => {
    // Register a new user and get an id, which comes from the RETURNING clause.
    const registerResult = await registerPerson({
        fullname: "Jane Doe",
        gender: "F",
        phone: "5555555555",
        age: 29,
    });
    const personId = registerResult.rows[0]["id"];
    console.log("Registered a person with id: " + personId);

    // Obtain the full person object from the database.
    const getPersonResult = await getPerson(personId);
    console.log(
        "Result of SELECT query for person '" +
        personId +
        "': " +
        JSON.stringify(getPersonResult.rows[0], null, "  ")
    );

    // Update the person's full name and query for them again to verify.
    await updatePersonName(personId, "Jane Johnson");
    const getChangedPersonResult = await getPerson(personId);
    console.log(
        "Result of SELECT query for person after name change '" +
        personId +
        "': " +
        JSON.stringify(getChangedPersonResult.rows[0], null, "  ")
    );

    // Clean up the database by removing the person record.
    await removePerson(personId);

    await pool.end();
})();
