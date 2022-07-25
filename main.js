// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns an array of random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//function to create a pAequor object - properties: scecimenNum, dna; -methods: mutate(), compareDNA(otherpAequor) and willLikelySurvive().
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // return an new array of the mutated dna( 1 randomly choosen DNA base is modified)
    mutate() {
      //return a random number form 1 to 15
      const index = Math.floor(Math.random() * 15);
      const currBase = this.dna[index];
      //get a random base for the ramdomly pick index
      let newBase = returnRandBase();
      while (currBase === newBase) {
        newBase = returnRandBase();
      }
      dna[index] = newBase;
      return this.dna;
    },
    //print the matching percentage between this dna specimen and an other dna specimen (passed in)
    compareDNA(pAequor) {
      count = 0;
      for (i = 0; i < 15; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          count++;
        }
      }
      console.log(`specimen ${this.specimenNum} and specimen ${
          pAequor.specimenNum
        } have ${Math.floor((count / 15) * 100)}% DNA in common`
      );
    },
    //return true if there is 60% of Cs or Gs(at least 9 entries out of 15)
    willLikelySurvive() {
      return (
        this.dna.filter((n) => {
          return n === "G" || n === "C";
        }).length >= 9
      );
    },
  };
};

//create an array of 30 viable pAequor object
const viablePAeqor = () => {
  const list = [];
  //iterate action 30 times
  for (i = 0; i < 30; i++) {
    //create a random pAequor
    let organism = pAequorFactory(i, mockUpStrand());
    //create a new pAequor until willLikelySurvive() return true
    while (!organism.willLikelySurvive()) {
      organism = pAequorFactory(i, mockUpStrand());
    }
    list.push(organism);
  }
  return list;
};

//create 30 viable pAequor
const manypAequor = viablePAeqor();
manypAequor.forEach(n=> console.log(n));



