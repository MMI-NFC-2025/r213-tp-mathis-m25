--
let message = '';
if (Astro.request.method === "POST") {
    const formData = await Astro.request.formData();
    const response = await addOffre(formData);
    message = response.message;
}
--

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
        const event = await pb.collection('evenement').getOne(ouhfpnd1w6vw4de);
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