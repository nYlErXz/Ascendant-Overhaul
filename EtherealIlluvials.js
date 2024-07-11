import React, { useState } from 'react';
import './App.css';

const initialIlluvials = {
  scarabok: ['Scarabok', 'Goliant', 'Titanor'],
  alphie: ['Alphie', 'Synalph', 'Dualeph'],
  rhamphy: ['Rhamphy', 'Rhamphite', 'Rhamphyre'],
};

const augmentCategories = {
  Affinity: ['Fire', 'Water', 'Nature', 'Air', 'Earth'],
  Classes: ['Bulwark', 'Rogue', 'Empath', 'Psion', 'Fighter'],
  Composites: ['Tsunami', 'Granite', 'Verdant', 'Inferno', 'Tempest', 'Colossus', 'Predator', 'Mystic', 'Invoker', 'Berserker', 'Steam', 'Mud', 'Toxic', 'Frost', 'Wildfire', 'Magma', 'Shock', 'Spore', 'Bloom', 'Dust', 'Vanguard', 'Slayer', 'Revenant', 'Phantom', 'Aegis', 'Harbinger', 'Behemoth', 'Enchanter', 'Templar', 'Arcanite'],
  Standard: ['AD', 'AS', 'Crit', 'Energy', 'Energy Regen', 'Bonus Health', 'Bonus Resist', 'Omega Power'],
  Legendary: ['AD + OP each second', 'Energy + Untargetability', 'Omnivamp + Shield', 'Meteors', 'Sea Wave', 'Invulnerability', 'True Damage', 'AA % Health'],
};

function EtherealIlluvials() {
  const [roundNumber, setRoundNumber] = useState(1);
  const [mpPoints, setMpPoints] = useState(50);
  const [illuvialStages, setIlluvialStages] = useState({
    scarabok: -1,
    alphie: -1,
    rhamphy: -1,
  });
  const [possessedIlluvials, setPossessedIlluvials] = useState([]);
  const [selectedIlluvial, setSelectedIlluvial] = useState('');
  const [selectedAugment1, setSelectedAugment1] = useState(null);
  const [selectedAugment2, setSelectedAugment2] = useState(null);
  const [acquiredAugments, setAcquiredAugments] = useState([]);
  const [showShop, setShowShop] = useState(false); // State to manage shop display

  const startRound = () => {
    if (roundNumber <= 9) {
      return (
        <div className="GameMenu">
          <h2>Preparation for Round {roundNumber}</h2>
          <p>MP Points: {mpPoints}</p>
          <div className="options-container">
            <h3>Select your Ethereal Illuvial Upgrade:</h3>
            {renderIlluvialOptions()}
          </div>
          <div className="selected-container">
            {selectedIlluvial && <p>Selected Illuvial: {selectedIlluvial}</p>}
          </div>
          <div className="augment-container">
            <h3>Select your {getAugmentCategoryLabel(1)}</h3>
            <div className="augment-options">
              {renderAugmentOptions(1)}
            </div>
          </div>
          <div className="augment-container">
            <h3>Select your {getAugmentCategoryLabel(2)}</h3>
            <div className="augment-options">
              {renderAugmentOptions(2)}
            </div>
          </div>
          <div className="acquired-augments-container">
            <h3>Acquired Augments</h3>
            <div className="acquired-augments">
              {renderAcquiredAugments()}
            </div>
          </div>
          <div className="possessed-container">
            <h3>Illuvials On the Board</h3>
            <ul>
              {possessedIlluvials.map((illuvial, index) => (
                <li key={index}>{illuvial}</li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            <button onClick={() => setShowShop(true)} className={showShop ? '' : 'dark-button'}>
              Display Shop
            </button>
            {renderNextRoundButton()}
          </div>
        </div>
      );
    } else if (roundNumber === 10) {
      return (
        <div className="GameMenu">
          <h2>Preparation for Round 10</h2>
          <p>MP Points: {mpPoints}</p>
          <div className="augment-container">
            <h3>Select your {getAugmentCategoryLabel(1)}</h3>
            <div className="augment-options">
              {renderAugmentOptions(1)}
            </div>
          </div>
          <div className="augment-container">
            <h3>Select your {getAugmentCategoryLabel(2)}</h3>
            <div className="augment-options">
              {renderAugmentOptions(2)}
            </div>
          </div>
          <div className="acquired-augments-container">
            <h3>Acquired Augments</h3>
            <div className="acquired-augments">
              {renderAcquiredAugments()}
            </div>
          </div>
          <div className="possessed-container">
            <h3>Illuvials On the Board</h3>
            <ul>
              {possessedIlluvials.map((illuvial, index) => (
                <li key={index}>{illuvial}</li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            <button onClick={() => setShowShop(true)} className={showShop ? '' : 'dark-button'}>
              Display Shop
            </button>
            {renderNextRoundButton()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="GameMenu">
          <h2>GG, You Win!!!</h2>
          <p>Congratulations on completing all the rounds!</p>
        </div>
      );
    }
  };

  const renderIlluvialOptions = () => {
    const currentOptions = getCurrentOptions();
    return currentOptions.map((illuvial, index) => (
      <button
        key={index}
        onClick={() => handleIlluvialSelect(illuvial)}
        className={canSelect(illuvial) ? (selectedIlluvial === illuvial ? 'selected' : '') : 'disabled'}
        disabled={!canSelect(illuvial) || (selectedIlluvial !== '' && selectedIlluvial !== illuvial)}
      >
        {illuvial}
      </button>
    ));
  };

  const canSelect = (illuvial) => {
    const line = Object.keys(initialIlluvials).find(line =>
      initialIlluvials[line].includes(illuvial)
    );

    if (!line) return false;

    const currentStage = illuvialStages[line];
    const stages = initialIlluvials[line];

    if (currentStage === stages.length - 1) {
      return false;
    }

    return true;
  };

  const handleIlluvialSelect = (illuvial) => {
    setSelectedIlluvial(illuvial);
  };

  const handleAugmentSelect = (augmentNumber, augmentOption) => {
    if (augmentNumber === 1) {
      setSelectedAugment1(augmentOption);
    } else if (augmentNumber === 2) {
      setSelectedAugment2(augmentOption);
    }
  };

  const renderAugmentOptions = (augmentNumber) => {
    const categoriesToShow = getAugmentCategories(roundNumber);
    const options = augmentCategories[categoriesToShow[augmentNumber - 1]];
    const maxOptionsToShow = categoriesToShow[augmentNumber - 1] === 'Affinity' || categoriesToShow[augmentNumber - 1] === 'Classes' ? 3 : 4;
    return options.slice(0, maxOptionsToShow).map((option, index) => (
      <button
        key={index}
        onClick={() => handleAugmentSelect(augmentNumber, option)}
        className={isAugmentSelected(augmentNumber, option) ? 'selected' : ''}
        disabled={isAugmentSelected(augmentNumber, option)}
      >
        {option}
      </button>
    ));
  };

  const isAugmentSelected = (augmentNumber, option) => {
    if (augmentNumber === 1 && selectedAugment1 === option) {
      return true;
    }
    if (augmentNumber === 2 && selectedAugment2 === option) {
      return true;
    }
    return false;
  };

  const renderAcquiredAugments = () => {
    return acquiredAugments.map((augment, index) => (
      <div key={index} className="acquired-augment-box">{augment}</div>
    ));
  };

  const renderNextRoundButton = () => {
    const canProceed = roundNumber !== 10 || (selectedAugment1 !== null && selectedAugment2 !== null);
    return (
      <button
        onClick={handleProceedToNextRound}
        disabled={!canProceed}
        className="proceed-button"
      >
        Proceed to Fight Round {roundNumber}
      </button>
    );
  };

  const handleProceedToNextRound = () => {
    if (selectedAugment1 !== null && selectedAugment2 !== null) {
      setAcquiredAugments([...acquiredAugments, selectedAugment1, selectedAugment2]);
      setSelectedAugment1(null);
      setSelectedAugment2(null);
    }

    if (selectedIlluvial !== '') {
      setPossessedIlluvials([...possessedIlluvials, selectedIlluvial]);
      updateIlluvialStage(selectedIlluvial);
      setSelectedIlluvial('');
    }

    setRoundNumber(roundNumber + 1);
    setMpPoints(mpPoints + 25);
  };

  const updateIlluvialStage = (illuvial) => {
    const line = Object.keys(initialIlluvials).find(line =>
      initialIlluvials[line].includes(illuvial)
    );

    if (!line) return;

    setIlluvialStages((prevStages) => ({
      ...prevStages,
      [line]: prevStages[line] + 1,
    }));
  };

  const getCurrentOptions = () => {
    const currentOptions = [];
    for (const line in initialIlluvials) {
      const stage = illuvialStages[line];
      const stages = initialIlluvials[line];
      if (stage < stages.length - 1) {
        currentOptions.push(stages[stage + 1]);
      }
    }
    return currentOptions;
  };

  const getAugmentCategoryLabel = (augmentNumber) => {
    const categoriesToShow = getAugmentCategories(roundNumber);
    return categoriesToShow[augmentNumber - 1];
  };

  const getAugmentCategories = (round) => {
    if (round < 3) {
      return ['Affinity', 'Classes'];
    } else if (round < 6) {
      return ['Standard', 'Composites'];
    } else if (round < 9) {
      return ['Legendary', 'Standard'];
    } else {
      return ['Legendary', 'Composites'];
    }
  };

  const handleReturnToPreparation = () => {
    setShowShop(false);
  };

  const renderShop = () => {
    return (
      <div className="ShopMenu">
        <h2>Illuvial Shop</h2>
        {[...Array(6).keys()].map((index) => (
          <div key={index}>
            <h3>{`T${index} Illuvials:`}</h3>
            {/* Placeholder content for each title */}
            <p>Placeholder content for T{index} Illuvials.</p>
          </div>
        ))}
        <button onClick={handleReturnToPreparation} className="dark-button">
          Return to Round Preparation
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      {showShop ? renderShop() : startRound()}
    </div>
  );
}

export default EtherealIlluvials;
