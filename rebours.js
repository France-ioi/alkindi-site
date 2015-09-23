function compte_a_rebours()
{
   var prefix = document.getElementById("compte_a_rebours_prefix");
   var compte_a_rebours = document.getElementById("compte_a_rebours");
   var legend = document.getElementById("compte_a_rebours_postfix")

   var date_actuelle = new Date();
   var date_evenement = new Date("Nov 30 00:00:00 2015");
   var competition_duration_in_sec = 86400; // Mat, je te laisse tuner la valeur, je sais pas combien de jours dure le concours...
   var total_secondes = (date_evenement - date_actuelle) / 1000;

   if (total_secondes < -competition_duration_in_sec)
   {
      prefix.innerHTML = "Le concours est terminé depuis"; // On modifie le préfixe si la différence est négatif
      legend.innerHTML = "";
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
      prefix.innerHTML = "";
      compte_a_rebours.innerHTML = 'Le concours est commencé.';
      legend.innerHTML = "";
   }
   var actualisation = setTimeout("compte_a_rebours();", 100000);
}
compte_a_rebours();
