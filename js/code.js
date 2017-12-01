//Code
//$(function () {
//10 ligne * 10 case
$('.demineur').load("code.js", genererGrille(10, 10),remplirGrille());

//Fonction qui genere une grille 
function genererGrille(ligne, col) {
    for (let j = 1; j <= ligne; j++) {
        $newLigne = $('<div class="ligne">');
        $('.demineur').append($newLigne);
    }

    for (let i = 1; i <= col; i++) {
        $newCase = $('<div class="open dem"></div>');
        $('.ligne').append($newCase);
    }
}

//Fonction qui récupére les cordonnée d'une case
function getPosition(x, y) {
    //    x = x - 1;
    //    y = y - 1;

    return document.getElementsByClassName("demineur")[0].getElementsByClassName("ligne")[x].getElementsByClassName("dem")[y];
}

// Fonction qui return un nombre aléatoire et qui permettra de placer les bombes
// Ici de 1 à 10 car ligne et colonne = 10
function randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Fonction qui generer grille cacher et qui nous aidera a remplir la grille
function genererGrilleCacher(ligne, col, mine) {
    let grille = [],
        nbCase = ligne * col;
    for (let i = 0; i < nbCase; i++) {
        grille.push(0);
    }


    var emplacementMine = [];
    for (var i = 0, index; true;) {
        if (emplacementMine.length < mine) {
            index = randomNum(0, nbCase - 1);
            if (emplacementMine.indexOf(index) === -1) {
                emplacementMine.push(index);
                grille[index] = 9;
            }
        } else {
            break;
        }
    }

    let rows = [],
        pos = 0;
    for (let i = 0; i < col; i++) {
        rows.push(grille.slice(pos, pos + ligne));
        pos += ligne;
    }

    // Redéfinition de "grille" : "rows" est une simple letiable témoin
    grille = rows;

    //Placement des chiffres (1,2,3,4,5,6,7,8)
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < ligne; j++) {
            if (grille[i][j] === 9) { // Si on tombe sur une bombe...
                // Chiffres au-dessus de la bombe
                if (i - 1 >= 0) {
                    // En haut à gauche...
                    if (j - 1 >= 0) {
                        if (grille[i - 1][j - 1] < 9) {
                            grille[i - 1][j - 1] += 1;
                        }
                    }
                    // En haut à droite
                    if (j + 1 < ligne) {
                        if (grille[i - 1][j + 1] < 9) {
                            grille[i - 1][j + 1] += 1;
                        }
                    }
                    // En haut au milieu
                    if (grille[i - 1][j] < 9) {
                        grille[i - 1][j] += 1;
                    }
                }

                // Chiffres au-niveau de la bombe
                // À gauche de la bombe
                if (j - 1 >= 0) {
                    if (grille[i][j - 1] < 9) {
                        grille[i][j - 1] += 1;
                    }
                }
                // À droite de la bombe
                if (j + 1 < ligne) {
                    if (grille[i][j + 1] < 9) {
                        grille[i][j + 1] += 1;
                    }
                }

                // Chiffres sous la bombe
                if (i + 1 < col) {
                    // En bas à gauche
                    if (j - 1 >= 0) {
                        if (grille[i + 1][j - 1] < 9) {
                            grille[i + 1][j - 1] += 1;
                        }
                    }
                    // En bas à droite
                    if (j + 1 < ligne) {
                        if (grille[i + 1][j + 1] < 9) {
                            grille[i + 1][j + 1] += 1;
                        }
                    }
                    // En bas au milieu
                    if (grille[i + 1][j] < 9) {
                        grille[i + 1][j] += 1;
                    }
                }
            }
        }
    }

    return grille;
}


/*
 *
 *   EVENEMENT
 *
 */

//Rempli la grille résolu
function remplirGrille() {
    let grille = genererGrilleCacher(10, 10, 7);
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {

            let position = [];
            position = getPosition(i, j);

            if (grille[i][j] === 0) {

                position.setAttribute("class", "open dem");
            }
            if (grille[i][j] === 1) {
                position.setAttribute("class", "open1 dem");
            }
            if (grille[i][j] === 2) {

                getPosition(i, j).setAttribute("class", "open2 dem");
            }
            if (grille[i][j] === 3) {

                getPosition(i, j).setAttribute("class", "open3 dem");
            }
            if (grille[i][j] === 4) {

                getPosition(i, j).setAttribute("class", "open4 dem");
            }
            if (grille[i][j] === 5) {

                getPosition(i, j).setAttribute("class", "open5 dem");
            }
            if (grille[i][j] === 6) {

                getPosition(i, j).setAttribute("class", "open6 dem");
            }
            if (grille[i][j] === 7) {

                getPosition(i, j).setAttribute("class", "open7 dem");
            }
            if (grille[i][j] === 8) {

                getPosition(i, j).setAttribute("class", "open8 dem");
            }
            if (grille[i][j] === 9) //La mine 
            {
                getPosition(i, j).setAttribute("class", "mine dem");
            }
        }
    }

}


//Evenement sur le clic d'une case
$('.case').on("click", function () {
    if (this.className === 'case') {
        this.className = "open";
    }

});


//Evenement pour enlever le contextNavigateur
$('.demineur').on('contextmenu', function (e) {
    e.preventDefault();
    return false;
});

//Evenement sur le clickDroit d'une case
$('.case').on("contextmenu", function () {

    if (this.className === "case") {
        this.className = "flag";
    } else if (this.className === "flag") {
        this.className = "question";
    } else if (this.className === "question") {
        this.className = "case";
    }
});



//});
