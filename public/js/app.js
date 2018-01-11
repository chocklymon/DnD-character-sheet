/**
 * Created by coakley on 5/9/16.
 */
angular.module('CharSheet', [])
    .factory('AbilityModifier', [function() {
        function getAbilityModifier(score) {
            if (score) {
                return Math.floor(score / 2 - 5);
            } else {
                return -5;
            }
        }

        return {
            get: getAbilityModifier
        };
    }])
    .filter('modifier', [function() {
        return function(input) {
            if (input >= 0) {
                return '+' + input;
            }
            return input;
        };
    }])
    .directive('csNumber', [function() {
        // Force the model value to be a number
        function parseNumber(value) {
            if (value) {
                return value*1;
            } else {
                return 0;
            }
        }

        return {
            restrict: 'AC',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(parseNumber);
            }
        };
    }])
    .controller('DnD5e', ['AbilityModifier', function(AbilityModifier) {
        var vm = this;

        // Abilities
        var abilities = {
            str: {
                name: 'Strength'
            },
            dex: {
                name: 'Dexterity'
            },
            con: {
                name: 'Constitution'
            },
            int: {
                name: 'Intelligence'
            },
            wis: {
                name: 'Wisdom'
            },
            cha: {
                name: 'Charisma'
            }
        };
        var skills = [
            {
                name: 'Acrobatics',
                ability: 'dex'
            },
            {
                name: 'Animal Handling',
                ability: 'wis'
            },
            {
                name: 'Arcana',
                ability: 'int'
            },
            {
                name: 'Athletics',
                ability: 'str'
            },
            {
                name: 'Deception',
                ability: 'cha'
            },
            {
                name: 'History',
                ability: 'int'
            },
            {
                name: 'Insight',
                ability: 'wis'
            },
            {
                name: 'Intimidation',
                ability: 'cha'
            },
            {
                name: 'Investigation',
                ability: 'int'
            },
            {
                name: 'Medicine',
                ability: 'wis'
            },
            {
                name: 'Nature',
                ability: 'int'
            },
            {
                name: 'Perception',
                ability: 'wis'
            },
            {
                name: 'Performance',
                ability: 'cha'
            },
            {
                name: 'Persuasion',
                ability: 'cha'
            },
            {
                name: 'Religion',
                ability: 'int'
            },
            {
                name: 'Sleight of Hand',
                ability: 'dex'
            },
            {
                name: 'Stealth',
                ability: 'dex'
            },
            {
                name: 'Survival',
                ability: 'wis'
            }
        ];


        vm.character = {
            hasInspiration: false,
            proficiency: 2,
            abilities: abilities,
            skills: skills
        };


        // Bind variables to the scope
        vm.mode = {
            editAll: false
        };

        // Scope functions
        vm.updateProficiencies = updateProficiencies;
        vm.updateSavingThrow = function(ability) {
            if ('mod' in ability) {
                ability.saveScore = calculateSavingThrowScore(ability);
            }
        };
        vm.updateSkillBonus = function(skill) {
            if ('mod' in abilities[skill.ability]) {
                skill.score = calculateSkillScore(skill);
            }
        };
        vm.updateModifier = function(abilityKey) {
            // Get the ability
            var ability = abilities[abilityKey];

            // Save the previous modifier, if there is one
            var previousModifier = ('mod' in ability) ? ability.mod : 0;

            // Update the ability modifier and the saving throw if needed
            ability.mod = AbilityModifier.get(ability.score);
            if (previousModifier !== ability.mod) {
                ability.saveScore = calculateSavingThrowScore(ability);
                updateSkillsForAbility(abilityKey);
            }
        };

        // Functions
        function calculateSavingThrowScore(ability) {
            var score = AbilityModifier.get(ability.score);
            if (ability.proficient) {
                score += vm.character.proficiency;
            }
            return score;
        }
        function calculateSkillScore(skill) {
            var score = abilities[skill.ability].mod;
            if (skill.proficient) {
                score += vm.character.proficiency;
            }
            return score;
        }
        function updateSkillsForAbility(abilityKey) {
            angular.forEach(skills, function(skill) {
                if (skill.ability === abilityKey) {
                    skill.score = calculateSkillScore(skill);
                }
            });
        }
        function updateProficiencies() {
            angular.forEach(skills, function(skill) {
                if (skill.proficient) {
                    skill.score = calculateSkillScore(skill);
                }
            });
            angular.forEach(abilities, function(ability) {
                if (ability.proficient) {
                    ability.saveScore = calculateSavingThrowScore(ability);
                }
            });
        }
    }]);
