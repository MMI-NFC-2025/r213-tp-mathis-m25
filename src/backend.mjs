import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });

        data = data.map((maison) => {
            maison.imageUrl = db.files.getUrl(maison, maison.image);
            return maison;
        });

        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, filename) {  
    return db.files.getUrl(record, filename);  
}

export async function getOneEvent(ouhfpnd1w6vw4de) {
    try {
        const event = await db.collection('evenement').getOne(ouhfpnd1w6vw4de);
        return event;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function getEventsByArtist(id) {
    try {
        const events = await db.collection("events").getFullList({
            filter: `artist = "${id}"`,
        });

        events.forEach(event => {
            event.img = db.files.getUrl(event, event.imgUrl);
        });

        return events;
    } catch (error) {
        console.error("Erreur getEventsByArtist :", error);
        return [];
    }
}

export async function allArtists() {
    try {
        return await db.collection("artiste_conservatoire").getFullList();
    } catch (error) {
        console.error("error allArtists: ", error);
        return [];
    }
}

export async function updateEvent(id, data) {
    try {
        const record = await db.collection("evenement").update(id, data);
        return { success: true, event: record, message: "Modifié avec succès !" };
    } catch (error) {
        return { success: false, event: null, message: "Erreur : " + error.message };
    }
}

export async function getOneArtist(id) {
    try {
        const artist = await db.collection("artiste_conservatoire").getOne(id);
        return artist;
    } catch (error) {
        console.error("Erreur getOneArtist :", error);
        return null;
    }
}

export async function getAgent(id) {
    try {
        return await db.collection('agent').getOne(id);
    } catch (error) {
        return null;
    }
}

export async function getOffresByAgent(agentId) {
    try {
        return await db.collection('maison').getFullList({
            filter: `agent = "${agentId}"`,
        });
    } catch (error) {
        return [];
    }
}

export async function getOffresByAgentId(id) {
    try {
        let data = await db.collection('maison').getFullList({
            filter: `agent = "${id}"`,
        });

        data = data.map((maison) => {
            maison.imageUrl = db.files.getUrl(maison, maison.image);
            return maison;
        });

        return data;
    } catch (error) {
        console.error("Erreur getOffresByAgentId :", error);
        return [];
    }
}

export async function allAgents() {
    try {
        return await db.collection('agent').getFullList();
    } catch (error) {
        console.error("Erreur allAgents : ", error);
        return [];
    }
}

export async function setFavori(house) {
    try {
        await db.collection('maison').update(house.id, {favori: !house.favori});
    } catch (error) {
        console.error("Erreur setFavori :", error);
    }
}