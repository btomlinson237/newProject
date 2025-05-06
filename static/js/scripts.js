// Alpine.js component definitions
document.addEventListener('alpine:init', () => {
  Alpine.data('tipCalc', () => ({
    bill: null, pct: 15, people: 1,
    tip: 0, total: 0, perPerson: 0,
    calculate() {
      this.tip = (this.bill || 0) * (this.pct / 100);
      this.total = (this.bill || 0) + this.tip;
      this.perPerson = this.people > 0 ? this.total / this.people : 0;
    }
  }));

  Alpine.data('bmiCalc', () => ({
    weight: null, height: null, unit: 'metric',
    bmi: null, category: '',
    calculate() {
      let w = this.weight || 0;
      let h = this.height || 0;
      if (this.unit === 'imperial') {
        w *= 0.453592;
        h *= 0.0254;
      }
      const b = h > 0 ? w / (h * h) : 0;
      this.bmi = b.toFixed(1);
      this.category = b < 18.5 ? 'Underweight'
                       : b < 25   ? 'Normal'
                       : b < 30   ? 'Overweight'
                       : 'Obese';
    }
  }));

  Alpine.data('interestCalc', () => ({
    principal: null, rate: null, time: null,
    interest: 0, total: 0,
    calculate() {
      const P = this.principal || 0;
      const r = (this.rate || 0) / 100;
      const t = this.time || 0;
      this.interest = (P * r * t).toFixed(2);
      this.total = (P + parseFloat(this.interest)).toFixed(2);
    }
  }));
});