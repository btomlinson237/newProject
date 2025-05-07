// static/js/scripts.js

document.addEventListener('alpine:init', () => {
  Alpine.data('tipCalc', () => ({
    // state
    bill:          null,
    pct:           15,
    people:        1,
    touchedBill:   false,
    touchedPct:    false,
    touchedPeople: false,
    tip:           0,
    total:         0,
    perPerson:     0,

    // computed validity
    get isValid() {
      return (
        this.bill   >  0 &&
        this.pct    >= 0 &&
        this.pct    <= 100 &&
        this.people >= 1
      );
    },

    // action
    calculate() {
      this.tip       = (this.bill || 0) * (this.pct / 100);
      this.total     = (this.bill || 0) + this.tip;
      this.perPerson = this.people > 0
        ? this.total / this.people
        : 0;
    }
  }));

  // leave your bmiCalc and interestCalc unchanged…
  Alpine.data('bmiCalc', () => ({ /* … */ }));
  Alpine.data('interestCalc', () => ({ /* … */ }));
});
