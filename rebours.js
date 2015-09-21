function compte_a_rebours()
{
	var compte_a_rebours = document.getElementById("compte_a_rebours");

	var date_actuelle = new Date();
	var date_evenement = new Date("Nov 30 00:00:00 2015");
	var total_secondes = (date_evenement - date_actuelle) / 1000;

	var prefixe = "Compte à rebours terminé dans ";
	if (total_secondes < 0)
	{
		prefixe = "Compte à rebours terminé il y a "; // On modifie le préfixe si la différence est négatif

		total_secondes = Math.abs(total_secondes); // On ne garde que la valeur absolue

	}

	if (total_secondes > 0)
	{
		var jours = Math.floor(total_secondes / (60 * 60 * 24));
		var mot_jour = "jours";


		if (jours == 0)
		{
			jours = '';
			mot_jour = '';
		}
		else if (jours == 1)
		{
			mot_jour = "jour";
		}

		compte_a_rebours.innerHTML = jours + ' ' + mot_jour;
	}
	else
	{
		compte_a_rebours.innerHTML = 'Le concours est commencé.';
	}
	var actualisation = setTimeout("compte_a_rebours();", 100000);
}
compte_a_rebours();
