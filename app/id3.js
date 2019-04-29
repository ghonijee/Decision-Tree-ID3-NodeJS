const _ = require('lodash');

module.exports=(() => {
  let model;

  function DecisionTreeID3(data, target, features) {
    this.data = data;
    this.target = target;
    this.features = features;
    model = createTree(data, target, features);
  }

  DecisionTreeID3.prototype = {
    testData: function(test) {
      let root = model;
      while (root.type !== NODE_TYPE.RESULT) {
        const feature = root.name;
        const valTestData = test[feature];
        const childNode = _.find(root.value, node => {
          return node.name == valTestData
        });

        if (childNode) {
          root = childNode.child;
        } else {
          root = root.value[0].child;
        }
      }
      return root.value;
    },

    import: function (json) {
      model = json;
    },

    toJSON: function () {
      return model;
    }
  };

  const NODE_TYPE = DecisionTreeID3.NODE_TYPE = {
    RESULT: 'result',
    FEATURE: 'feature',
    FEATURE_VALUE: 'feature_value'
  };

  function createTree(data, target, features) {
    const valTargets = _.uniq(_.map(data, target));
    if (valTargets.length == 1) {
      return {
        type: NODE_TYPE.RESULT,
        value: valTargets[0],
        name: valTargets[0],
        alias: valTargets[0] + Math.random().toString(32).slice(2)
      };
    }

    // if(features.length == 0) {
    //   const bestTarget = mostCommon(valTargets);
    // }

    const bestFeature = maxGain(data, target, features);
    const featuresRemaining = _.without(features, bestFeature);
    const valueBestFeature = _.uniq(_.map(data, bestFeature)); //value yang ada di feature dengan gain tertinggi

    const node = {
      name: bestFeature,
      alias: bestFeature + Math.random().toString(32).slice(2)
    }

    node.type = NODE_TYPE.FEATURE;
    node.value = _.map(valueBestFeature, (v) => { //memecah nilai dari best Feature
      const newSubFeature = data.filter((x) => { // mencari data feature terbaik dan memiliki nilai dari atas
        return x[bestFeature] === v
      })

      const child_node = {
        name: v,
        alias: v + Math.random().toString(32).slice(2),
        type: NODE_TYPE.FEATURE_VALUE
      };

      child_node.child = createTree(newSubFeature, target, featuresRemaining);
      return child_node;
    })

    return node;
    // return valTargets;
  }

  function maxGain(data, target, features) {
    const best = _.maxBy(features, function (el) {
      return gain(data, target, el); //membawa data, target , dan el berupa salah satu features
    })
    return best;
  }

  function gain(data, target, feature) {
    const valFeature = _.uniq(_.map(data, feature)); //mencari jenis value dari featuru ex: feature 'COLOR' : [red, blue, yellow]
    const entropyTotal = entropy(_.map(data, target)); //mencari entropy total dari target
    const sizeTotal = _.size(data);

    const subEntropy = valFeature.map((n) => {
      const subFeature = data.filter((x) => {
        return x[feature] === n
      })

      const value = (subFeature.length / sizeTotal) * entropy(_.map(subFeature, target));

      return value;
    })

    //menjumlah entropy masing2 value feature
    const sumEntropy = subEntropy.reduce((a, b) => {
      return a + b
    })

    const gainFeatueVal = entropyTotal - sumEntropy;
    return gainFeatueVal
  }

  function entropy(valTarget) {
    const uniqTarget = _.uniq(valTarget); // mengahapus data double

    const probabilitas = uniqTarget.map((x) => { //menghitung probabilitas true or false nya
      const occurrences = _.filter(valTarget, (el) => {
        return el === x
      })

      const occurrencesLenght = occurrences.length; //banyak true atau false nya
      const dataLenght = valTarget.length; // banyak data
      return occurrencesLenght / dataLenght
    });
    // cari log dari true or false 
    const logValue = probabilitas.map((p) => {
      return -p * Math.log2(p) // p adalah banyak yang true/false dibagi banyak data
    })

    const entropyVals = logValue.reduce((a, b) => {
      return a + b
    })
    return entropyVals;
  }

  // function mostCommon(valTargets) {
  //   const elFrequencyMap = {};
  //   const largestFrequency = -1;
  //   const mostCommonEl = null;

  //   valTargets.forEach(element => {
  //     const elFrequency = (elFrequencyMap[element] || 0) + 1;
  //     // console.log(elFrequency);
  //   });
  // }

  return DecisionTreeID3;
})();
// const hasil = DecisionTreeID3(data, target, features);

// module.exports = hasil;