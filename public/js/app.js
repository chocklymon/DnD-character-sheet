/**
 * Created by coakley on 5/9/16.
 */
angular.module('CharSheet', [])
    .controller('Main', ['$scope', function($scope) {
        // Functions
        var getAbilityModifier = function(score) {
            if (score) {
                return Math.floor(score / 2 - 5);
            } else {
                return '';
            }
        };
        var calculateSavingThrowScore = function(savingThrow) {
            var score = savingThrow.ability.mod*1;
            if (savingThrow.proficient) {
                score += $scope.proficiencyBonus*1;
            }
            return score;
        };
        var calculateSkillScore = function(skill) {
            var score = abilities[skill.ability].mod*1;
            if (skill.proficient) {
                score += $scope.proficiencyBonus*1;
            }
            return score;
        };
        var updateSkillsForAbility = function(abilityKey) {
            angular.forEach(skills, function(skill) {
                if (skill.ability == abilityKey) {
                    skill.score = calculateSkillScore(skill);
                }
            });
        };
        var updateProficiencies = function() {
            angular.forEach(skills, function(skill) {
                if (skill.proficient) {
                    skill.score = calculateSkillScore(skill);
                }
            });
            angular.forEach(savingThrows, function(savingThrow) {
                if (savingThrow.proficient) {
                    savingThrow.score = calculateSavingThrowScore(savingThrow);
                }
            });
        };

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
        var savingThrows = {};
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

        angular.forEach(abilities, function(ability, name) {
            savingThrows[name] = {
                ability: ability,
                proficient: false
            };
        });


        // Bind variables to the scope
        $scope.proficiencyBonus = 0;
        $scope.mode = {
            editAll: false
        };
        $scope.abilities = abilities;
        $scope.savingThrows = savingThrows;
        $scope.skills = skills;

        // Scope functions
        $scope.updateProficiencies = updateProficiencies;
        $scope.updateSavingThrow = function(savingThrow) {
            if ('mod' in savingThrow.ability) {
                savingThrow.score = calculateSavingThrowScore(savingThrow);
            }
        };
        $scope.updateSkillBonus = function(skill) {
            if ('mod' in abilities[skill.ability]) {
                skill.score = calculateSkillScore(skill);
            }
        };
        $scope.updateModifier = function(abilityKey) {
            // Get the ability
            var ability = abilities[abilityKey];

            // Save the previous modifier, if there is one
            var previousModifier = ('mod' in ability) ? ability.mod : null;

            // Update the ability modifier and the saving throw if needed
            ability.mod = getAbilityModifier(ability.score);
            if (previousModifier != ability.mod) {
                savingThrows[abilityKey].score = calculateSavingThrowScore(savingThrows[abilityKey]);
                updateSkillsForAbility(abilityKey);
            }
        };
    }]);
