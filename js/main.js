var pokeback = (function() {

    var selection;
    var pokemonNames = [];
    var autoComplete;
    ///////////////////////////////////

    function init() {
        $(document).ready(initialLoad);
    }

    function initialLoad(e) {
        window.console.log("initiated!")


        for (var i = 0; i < pokemon.length; i++) {
            pokemonNames.push(pokemon[i].name);
        }

        window.console.log(pokemonNames.length);

        var input = document.getElementById("enemy-choise");
        autoComplete = new Awesomplete(input, {
            list: pokemonNames
        });


        window.console.log(autoComplete);
        addEventListeners();

    }

    function addEventListeners() {
        $(".tab").on("click", onTabClick);
        $(".selection").on("change", onChangeSelection);
        $(".select-button").on("click", calculate);
        Awesomplete.$('#enemy-choise').addEventListener("awesomplete-selectcomplete", onAutocompleteSelect);
    }

    /// EVENT LISTENERS /////
    ///
    function onAutocompleteSelect(e) {
        var name = $("#enemy-choise").val();
        var result = _.filter(pokemon, function(o) {
            return o.name.toLowerCase() === name.toLowerCase()
        })
        selection = result[0].type.toLowerCase();
        window.console.log(name, result, selection);
    }

    function onChangeSelection(e) {
        var option = $(e.currentTarget).find("option:selected").text();
        window.console.log(option);
        selection = option.toLowerCase();
    }

    function onTabClick(e) {
        var item = $(e.currentTarget);
        $(".selection").removeClass("selected");
        $(".selection").addClass("hidden");

        window.console.log(item);
        if (item.hasClass("text") === true) {
            // TweenMax.to(".inner-selector", 0.8, {
            //     top: "0"
            // });
            $($(".inner-selector").children()[0]).removeClass("hidden").addClass("selected");
            window.console.log("text");
        } else if (item.hasClass("type") === true) {
            // TweenMax.to(".inner-selector", 0.8, {
            //     top: "-120"
            // });
            $($(".inner-selector").children()[1]).removeClass("hidden").addClass("selected");
            window.console.log("type");
        } else if (item.hasClass("image") === true) {
            // TweenMax.to(".inner-selector", 0.8, {
            //     top: "-240"
            // });
            $($(".inner-selector").children()[2]).removeClass("hidden").addClass("selected");
            window.console.log("image");
        }
    }

    function calculate(e) {
        var type = selection;

        var arr = receiveDoubleDamage(type);//getDoubleDamage(type);
        var lowDmg = receiveLowDamage(type);
        var appropriateMoves = [];
        var tempType;
        var tempArr = [];
        window.console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            tempType = arr[i];
            tempArr = getAbilitiesByType(tempType);
            window.console.log(tempArr);
            appropriateMoves = _.union(appropriateMoves, tempArr);
        }

        window.console.log(appropriateMoves);
        produceResults(appropriateMoves, lowDmg);
    }

    function produceResults(results, lowDmg) {
        $(".abilitiesx2 .gallery").empty();
        $(".resultsPokemons .gallery").empty();
        $(".abilitiesHalf .gallery").empty();
        $(".abilitiesx2 .gallery").append("<ul></ul>");
        $(".abilitiesHalf .gallery").append("<ul></ul>");
        $(".resultsPokemons .gallery").append("<ul></ul>");
        for (var i = 0; i < results.length; i++) {
            $(".abilitiesx2 .gallery ul").append("<li class='" + results[i].type + "''>" + results[i].name + "<span class='badge " + results[i].type + "'>" + results[i].type.toUpperCase() + "</span>" + "</li>");
            for (var j = 0; j < results[i].pokemons.length; j++) {
                $(".resultsPokemons .gallery").append("<li class='resultPokemons'><img src='assets/pokemons/" + results[i].pokemons[j] + ".png' />" + "</li>");
            }
        }

        for(var i=0;i<lowDmg.length;i++) {
            $(".abilitiesHalf .gallery ul").append("<li class='"+lowDmg[i]+"'>"+lowDmg[i].toUpperCase()+"</li>");
        }
    }

    function getDoubleDamage(type) {
        var parts = type.split(",");
        var extra = [];
        window.console.log(parts);
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                extra.push(getDoubleDamage(parts[i]));
            }

            window.console.log(extra);
            return _.flattenDeep(extra);
        }

        switch (type) {
            case "normal":
                return ["nothing"]
                break;
            case "fire":
                return ["grass", "ice", "steel"]
                break;
            case "electric":
                return ["water", "flying"]
                break;
            case "water":
                return ["fire", "ground"]
                break;
            case "grass":
                return ["water", "ground", "rock"]
                break;
            case "ice":
                return ["grass", "flying", "ground", "dragon"]
                break;
            case "fight":
                return ["normal", "ice", "rock", "dark", "steel"]
                break;
            case "poison":
                return ["grass", "fairy"]
                break;
            case "ground":
                return ["fire", "electric", "poison", "rock", "steel"]
                break;
            case "flying":
                return ["grass", "fight", "bug"]
                break;
            case "psychic":
                return ["fight", "poison"]
                break;
            case "bug":
                return ["grass", "psychic", "dark"]
                break;
            case "rock":
                return ["fire", "flying", "ice", "bug"]
                break;
            case "ghost":
                return ["psychic", "ghost"]
                break;
            case "dragon":
                return ["dragon"]
                break;
            case "dark":
                return ["psychic", "ghost"]
                break;
            case "steel":
                return ["ice", "fairy", "rock"]
                break;
            case "fairy":
                return ["fight", "dark", "dragon"]
                break;
        }
    }

    function receiveDoubleDamage(type) {
        var parts = type.split(",");
        var extra = [];
        window.console.log(parts);
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                extra.push(receiveDoubleDamage(parts[i]));
            }

            window.console.log(extra);
            return _.flattenDeep(extra);
        }

        switch (type) {
            case "normal":
                return ["fighting"]
                break;
            case "fire":
                return ["water","ground", "rock"]
                break;
            case "electric":
                return ["ground"]
                break;
            case "water":
                return ["electric", "grass"]
                break;
            case "grass":
                return ["fire", "ice","poison","flying"]
                break;
            case "ice":
                return ["fire","fighting","rock","steel"]
                break;
            case "fight":
                return ["flying","psychic","fairy"]
                break;
            case "poison":
                return ["ground","psychic"]
                break;
            case "ground":
                return ["water","grass","ice"]
                break;
            case "flying":
                return ["electric","ice","rock"]
                break;
            case "psychic":
                return ["bug","ghost","dark"]
                break;
            case "bug":
                return ["fire","flying","rock"]
                break;
            case "rock":
                return ["water","grass","fight","ground","steel"]
                break;
            case "ghost":
                return ["ghost","dark"]
                break;
            case "dragon":
                return ["dragon","ice","fairy"]
                break;
            case "dark":
                return ["fight","bug","fairy"]
                break;
            case "steel":
                return ["fight","ground"]
                break;
            case "fairy":
                return ["poison","steel"]
                break;
        }
    }

    function receiveLowDamage(type) {
        var parts = type.split(",");
        var extra = [];
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                extra.push(receiveDoubleDamage(parts[i]));
            }
            return _.flattenDeep(extra);
        }

        switch (type) {
            case "normal":
                return ["nothing"]
                break;
            case "fire":
                return ["fire", "grass","ice","fairy","steel"]
                break;
            case "electric":
                return ["electric","flying","steel"]
                break;
            case "water":
                return ["fire","water","ice","steel"]
                break;
            case "grass":
                return ["water","electric","grass","ground"]
                break;
            case "ice":
                return ["ice"]
                break;
            case "fight":
                return ["bug","rock","dark"]
                break;
            case "poison":
                return ["grass","fight","poison","bug","fairy"]
                break;
            case "ground":
                return ["poison","rock"]
                break;
            case "flying":
                return ["grass","fight","bug"]
                break;
            case "psychic":
                return ["fight","psychic"]
                break;
            case "bug":
                return ["grass","fight","ground"]
                break;
            case "rock":
                return ["normal","fire","poison","flying"]
                break;
            case "ghost":
                return ["poison","bug"]
                break;
            case "dragon":
                return ["fire","water","electric","grass"]
                break;
            case "dark":
                return ["ghost","dark"]
                break;
            case "steel":
                return ["normal","grass","ice","flying","psychic","rock","bug","dragon","steel","fairy"]
                break;
            case "fairy":
                return ["fight","bug","dark"]
                break;
        }
    }

    function getExtraDamage(type) {

    }

    function getAbilitiesByType(type) {
        window.console.log(">>>> ", type);
        return _.filter(moves, function(o) {
            return o.type === type
        });
    }

    return {
        init: function() {
            init();
        }
    };

})();
