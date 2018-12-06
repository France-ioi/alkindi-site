/*function compte_a_rebours()
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
compte_a_rebours();*/

/***
Countdown from https://codepen.io/garethdweaver/pen/eNpWBb
*/

myApp.directive('countdown',
   ['Util','$interval', function(Util, $interval) {
      return {
        restrict: 'A',
        scope: {
          date: '@'
        },
        link: function(scope, element) {
          var future = new Date(scope.date);
          function updateCountdown() {
            var diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
            element.html(Util.dhms(diff));
          }
          updateCountdown();
          $interval(updateCountdown, 1000);
        }
      };
   }]).factory('Util', [function() {
      return {
         dhms: function(t) {
            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            function pad2(n) {
               if (n >= 0 && n < 100) {
                  return (100 + n).toString().substr(1, 2);
               }
               return n.toString();
            }
            var html = '<div class="countdown">';
            if (days) {
               html += '<span class="bloc-time days"><span class="value">' + pad2(days) + '</span><span class="unit">jours</span></span>';
            }
            html += '<span class="bloc-time hours"><span class="value">' + pad2(hours) + '</span><span class="unit">heures</span></span>';
            html += '<span class="bloc-time mins"><span class="value">' + pad2(minutes) + '</span><span class="unit">minutes</span></span>';
            html += '<span class="bloc-time secs"><span class="value">' + pad2(seconds) + '</span><span class="unit">secondes</span></span>';
            return html;
         }
      };
   }]
);