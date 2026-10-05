const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'module-2-physical-development.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

function blockToMarkdown(b) {
  if (!b) return '';
  switch (b.type) {
    case 'paragraph':
      return b.text + '\n';
    case 'learning_objectives': {
      let out = (b.text ? b.text + '\n\n' : '') + '### Learning Objectives\n\n';
      if (b.items) out += b.items.map(i => '- ' + i).join('\n') + '\n';
      return out;
    }
    case 'definition':
      return '> **' + b.term + ':** ' + b.text + '\n';
    case 'comparison': {
      let out = '### ' + (b.title || 'Comparison') + '\n\n';
      out += '| Concept | Description |\n| --- | --- |\n';
      (b.items || []).forEach(it => {
        out += '| **' + it.term + '** | ' + it.text + ' |\n';
      });
      return out;
    }
    case 'example': {
      let out = '';
      if (b.title) out += '#### ' + b.title + '\n\n';
      if (b.text) out += '**Example:** ' + b.text + '\n\n';
      if (b.items) out += b.items.map(i => '- ' + i).join('\n') + '\n';
      return out;
    }
    case 'callout': {
      let badge = '**Key Principle:** ';
      if (b.variant === 'safety_warning') badge = '**Safety Guidance:** ';
      if (b.variant === 'important_note') badge = '**Important Note:** ';
      if (b.variant === 'evidence') badge = '**Clinical Evidence:** ';
      if (b.variant === 'when_to_seek_help') badge = '**When to Seek Professional Advice:** ';
      return '> ' + badge + b.text + '\n';
    }
    case 'list': {
      let out = (b.intro ? b.intro + '\n\n' : '');
      if (b.items) {
        out += b.items.map(it => {
          if (typeof it === 'string') return '- ' + it;
          if (it.label) return '- **' + it.label + ':** ' + it.text;
          return '- ' + JSON.stringify(it);
        }).join('\n') + '\n';
      }
      return out;
    }
    case 'age_stage': {
      let out = '### Age Stage: ' + b.label + '\n\n' + (b.summary || '') + '\n\n';
      if (b.abilities_intro) out += '**' + b.abilities_intro + '**\n\n';
      if (b.abilities) out += b.abilities.map(a => '- ' + a).join('\n') + '\n\n';
      if (b.notes) {
        b.notes.forEach(n => { out += blockToMarkdown(n) + '\n'; });
      }
      return out;
    }
    case 'subsection': {
      let out = '### ' + b.title + '\n\n';
      (b.blocks || []).forEach(sb => {
        out += blockToMarkdown(sb) + '\n';
      });
      return out;
    }
    case 'guideline_table': {
      let out = '#### ' + b.title + '\n\n';
      out += '| Age Range | Recommended Sleep Hours (in 24 Hours) |\n| --- | --- |\n';
      (b.rows || []).forEach(r => {
        out += '| ' + r.age + ' | ' + r.hours_min + '–' + r.hours_max + ' hours |\n';
      });
      return out;
    }
    case 'age_group_play': {
      let out = '### Recommended Play: ' + b.audience + '\n\n' + (b.summary || '') + '\n\n';
      if (b.examples_intro) out += '**' + b.examples_intro + '**\n\n';
      if (b.examples) out += b.examples.map(e => '- ' + e).join('\n') + '\n';
      return out;
    }
    case 'case_study': {
      let out = '### Case Study: ' + b.title + '\n\n';
      if (b.setting) out += '**Setting:** ' + b.setting + '\n';
      if (b.characters) {
        out += '**Participants:** ' + b.characters.map(c => c.name + ' (' + c.role + (c.age ? ', ' + c.age : '') + ')').join(', ') + '\n\n';
      }
      (b.narrative || []).forEach(nb => {
        out += blockToMarkdown(nb) + '\n';
      });
      if (b.what_this_case_teaches) {
        out += '#### ' + b.what_this_case_teaches.heading + ':\n\n';
        out += b.what_this_case_teaches.items.map(it => '- ' + it).join('\n') + '\n\n';
      }
      if (b.discussion_questions) {
        out += '#### ' + b.discussion_questions.heading + ':\n\n';
        out += b.discussion_questions.items.map(q => q.order + '. ' + q.question).join('\n') + '\n\n';
      }
      return out;
    }
    case 'activity': {
      let out = '### Practical Observation Activity: ' + b.title + '\n\n' + b.instructions + '\n\n';
      if (b.record_intro) out += '**' + b.record_intro + '**\n\n';
      if (b.record_items) {
        out += b.record_items.map(ri => '- **' + ri.prompt + ':** ' + ri.examples).join('\n') + '\n\n';
      }
      if (b.follow_up) out += '**Follow-Up Action:**\n\n' + b.follow_up + '\n';
      return out;
    }
    default:
      return (b.text || '') + '\n';
  }
}

// Map assessment questions by related lesson numbers
const questionsMap = {};
data.module.assessment.questions.forEach(q => {
  const optIndex = { A: 0, B: 1, C: 2, D: 3 }[q.correct_option] ?? 0;
  const item = {
    id: q.id,
    prompt: q.question,
    options: q.options.map(o => o.text),
    correctAnswerIndex: optIndex,
    explanation: q.explanation || ''
  };
  (q.related_lessons || []).forEach(lNum => {
    if (!questionsMap[lNum]) questionsMap[lNum] = [];
    questionsMap[lNum].push(item);
  });
});

const lesson12Content = `### Common Pitfalls to Avoid in Early Physical Development

While every parent wants their child to thrive, certain common habits can inadvertently slow progress or cause unnecessary anxiety:

1. **Comparing Children to Rigid Milestone Deadlines**
   - *The Mistake:* Believing every child must walk, crawl, or run at the exact same month, and assuming a slight variation means a defect.
   - *The Reality:* Milestones (like those defined by the CDC) represent broad population guides where 75% of children achieve the skill. Some healthy children walk at 10 months; others at 15 months. Steady, continuous progress matters far more than the exact date.

2. **Unnecessary Physical Restriction**
   - *The Mistake:* Keeping infants and toddlers in car seats, prams, bouncers, high chairs, or baby walkers for multiple hours a day.
   - *The Reality:* Young bodies need freedom of movement. The World Health Organization (WHO) explicitly recommends that infants and children under 2 years should not be restrained for more than one hour at a time. Floor play, tummy time, and supervised cruising allow muscles and bones to strengthen naturally.

3. **Forcing Skills Before the Body Is Ready**
   - *The Mistake:* Forcing a baby to sit with pillows or stand upright before they have developed adequate trunk, core, and neck control.
   - *The Reality:* Children develop motor skills cephalocaudally (head-to-toe) and proximodistally (core-to-limbs). Allow children to master head control and rolling before expecting them to sit or cruise.

4. **Dismissing Genuine Red Flags**
   - *The Mistake:* Assuming that severe limpness, floppiness, persistent extreme stiffness, or losing previously mastered skills will simply "sort itself out."
   - *The Reality:* While individual variation is normal, developmental regression (a child who walked and suddenly stops) or asymmetric limb use requires prompt professional medical evaluation.

5. **Over-Relying on Expensive Commercial Equipment**
   - *The Mistake:* Thinking children need costly gadgets, electronic jumpers, or specialized baby gyms to develop coordination.
   - *The Reality:* Everyday, low-cost household objects—plastic cups, safe bowls, soft balls, clean floor mats, music for dancing, and outdoor open space—provide ideal sensory and physical enrichment.`;

const courseLessons = data.module.lessons.map((l, idx) => {
  let md = (l.blocks || []).map(blockToMarkdown).join('\n\n').trim();
  if (!md && l.id === 'm2-l12') {
    md = lesson12Content;
  }
  
  const lessonOrder = idx + 1;
  const qList = questionsMap[lessonOrder] || [];
  
  const lessonObj = {
    id: 'ecd-' + l.id,
    moduleId: 'ecd-m2',
    programId: 'ecd-cert',
    title: `${lessonOrder}. ${l.title}`,
    order: lessonOrder,
    hasVideo: false,
    content: md,
    coachNotes: `Guide the student through ${l.title.toLowerCase()}, emphasizing evidence-based movement milestones, safe play, and early pediatric red flags.`
  };

  if (qList.length > 0) {
    lessonObj.quiz = {
      id: `quiz-m2-l${String(lessonOrder).padStart(2, '0')}`,
      lessonId: lessonObj.id,
      programId: 'ecd-cert',
      passingScore: 70,
      questions: qList
    };
  }

  return lessonObj;
});

// Also add a Capstone Checkpoint Lesson for Module 2: Key Takeaways & Comprehensive 10-Question Assessment!
const all10Questions = data.module.assessment.questions.map(q => {
  const optIndex = { A: 0, B: 1, C: 2, D: 3 }[q.correct_option] ?? 0;
  return {
    id: q.id,
    prompt: q.question,
    options: q.options.map(o => o.text),
    correctAnswerIndex: optIndex,
    explanation: q.explanation || ''
  };
});

const keyTakeawaysMd = `### Module 2 Key Takeaways & Summary

${data.module.key_takeaways.items.map(it => `${it.order}. **${it.text}**`).join('\n\n')}

### Professional Medical Note
${data.module.professional_note.paragraphs.join('\n\n')}

---
Take the comprehensive 10-question Knowledge Check below to complete Module 2!`;

courseLessons.push({
  id: 'ecd-m2-l14',
  moduleId: 'ecd-m2',
  programId: 'ecd-cert',
  title: '14. Module 2 Key Takeaways & Comprehensive Assessment',
  order: 14,
  hasVideo: false,
  content: keyTakeawaysMd,
  coachNotes: 'Encourage the student to review the 10 key takeaways before taking the complete Module 2 Knowledge Check.',
  quiz: {
    id: 'quiz-m2-comprehensive',
    lessonId: 'ecd-m2-l14',
    programId: 'ecd-cert',
    passingScore: 70,
    questions: all10Questions
  }
});

const glossary = data.module.glossary.terms.map(t => ({
  term: t.term,
  definition: t.definition
}));

const references = [];
data.module.references.groups.forEach(g => {
  g.items.forEach(it => {
    references.push({
      title: it.citation,
      url: it.url || undefined
    });
  });
});

const module2 = {
  id: 'ecd-m2',
  programId: 'ecd-cert',
  title: '2. Physical Development in Early Childhood',
  order: 2,
  description: 'Explore physical development from ages 0–5, gross and fine motor skills, milestones as guides, nutrition and sleep, the role of play, and red flags for professional care.',
  glossary,
  references,
  lessons: courseLessons
};

const tsContent = 'import { CourseModule } from \'../types/studentPortal\';\n\n' +
  'export const MODULE_2_PHYSICAL_DEVELOPMENT: CourseModule = ' +
  JSON.stringify(module2, null, 2) + ';\n';

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'module2Data.ts'),
  tsContent,
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'module2_export.json'),
  JSON.stringify(module2, null, 2),
  'utf8'
);

console.log('Successfully generated Module 2 TypeScript data and export with', courseLessons.length, 'lessons and', all10Questions.length, 'comprehensive questions!');

