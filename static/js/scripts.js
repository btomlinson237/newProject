// static/js/scripts.js

// — Alpine component registrations —
document.addEventListener('alpine:init', () => {
  Alpine.data('tipCalc', () => ({
    bill:          null,
    pct:           15,
    people:        1,
    touchedBill:   false,
    touchedPct:    false,
    touchedPeople: false,
    tip:           0,
    total:         0,
    perPerson:     0,
    history:       [],

    get isValid() {
      return (
        this.bill   >  0 &&
        this.pct    >= 0 &&
        this.pct    <= 100 &&
        this.people >= 1
      );
    },

    calculate() {
      this.tip       = (this.bill || 0) * (this.pct / 100);
      this.total     = (this.bill || 0) + this.tip;
      this.perPerson = this.people > 0
        ? this.total / this.people
        : 0;

      this.history.push({
        bill:       this.bill,
        pct:        this.pct,
        people:     this.people,
        tip:        this.tip.toFixed(2),
        total:      this.total.toFixed(2),
        perPerson:  this.perPerson.toFixed(2)
      });
    }
  }));

  Alpine.data('bmiCalc', () => ({
    weight:        null,
    height:        null,
    unit:          'metric',
    touchedWeight: false,
    touchedHeight: false,
    bmi:           null,
    category:      '',
    history:       [],

    get isValid() {
      return this.weight > 0 && this.height > 0;
    },

    calculate() {
      let w = this.weight || 0;
      let h = this.height || 0;
      if (this.unit === 'imperial') {
        w *= 0.453592;
        h *= 0.0254;
      }
      const b = h > 0 ? w / (h * h) : 0;
      this.bmi      = b.toFixed(1);
      this.category = b < 18.5 ? 'Underweight'
                       : b < 25   ? 'Normal'
                       : b < 30   ? 'Overweight'
                       : 'Obese';

      this.history.push({
        weight:   this.weight,
        height:   this.height,
        unit:     this.unit,
        bmi:      this.bmi,
        category: this.category
      });
    }
  }));

  Alpine.data('interestCalc', () => ({
    principal: null,
    rate:      null,
    time:      null,
    touchedP:  false,
    touchedR:  false,
    touchedT:  false,
    interest:  0,
    total:     0,
    history:   [],

    get isValid() {
      return this.principal > 0 && this.rate >= 0 && this.time > 0;
    },

    calculate() {
      const P = this.principal || 0;
      const r = (this.rate || 0) / 100;
      const t = this.time || 0;
      this.interest = (P * r * t).toFixed(2);
      this.total    = (P + parseFloat(this.interest)).toFixed(2);

      this.history.push({
        principal: this.principal.toFixed(2),
        rate:      this.rate.toFixed(2),
        time:      this.time.toFixed(2),
        interest:  this.interest,
        total:     this.total
      });
    }
  }));

  // — Itemized split with line‐item assignment —
  Alpine.data('itemizedSplit', () => ({
    taxRate:     8.25,
    tipRate:     15,
    peopleInput: '',
    people:      [],
    items:       [],
    shares:      {},

    init() {
      // 1) parse once on mount
      this.parsePeople();
      // 2) re-parse whenever the text changes
      this.$watch('peopleInput', () => this.parsePeople());
    },

    addItem() {
      this.items.push({ desc: '', price: 0, assigned: [] });
    },
    removeItem(i) {
      this.items.splice(i, 1);
    },

    parsePeople() {
      // break on commas, trim out empties
      this.people = this.peopleInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      // reset any stale assignments
      this.items.forEach(it => { it.assigned = []; });
    },

    calculate() {
      const subtotals = {};
      this.people.forEach(p => subtotals[p] = 0);

      // allocate each item equally to its assignees
      this.items.forEach(it => {
        const n = it.assigned.length;
        if (!n) return;
        const per = it.price / n;
        it.assigned.forEach(p => subtotals[p] += per);
      });

      const itemTotal = Object.values(subtotals).reduce((a, b) => a + b, 0);
      const taxAmt    = itemTotal * (this.taxRate / 100);
      const tipAmt    = itemTotal * (this.tipRate / 100);
      const grandTotal= itemTotal + taxAmt + tipAmt;
      const factor    = grandTotal / itemTotal;

      // final per-person share
      this.people.forEach(p => {
        this.shares[p] = subtotals[p] * factor;
      });
    }
  }));
});

// — Theme toggle logic —
// Moves the <html> between light/dark based on switch & persists choice.
(function() {
  const toggle = document.getElementById('themeToggle');
  const root   = document.documentElement;
  const saved  = localStorage.getItem('theme');

  if (
    saved === 'light' ||
    (!saved && window.matchMedia('(prefers-color-scheme: light)').matches)
  ) {
    root.setAttribute('data-theme', 'light');
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
})();
