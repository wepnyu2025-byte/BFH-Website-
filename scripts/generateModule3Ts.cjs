const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'module-3-cognitive-development.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

function blockToMarkdown(b) {
  if (!b) return '';
  switch (b.type) {
    case 'scenario':
      return '> **Clinical Scenario:** ' + b.text + '\n';
    case 'paragraph':
      return b.text + '\n';
    case 'learning_objectives': {
      let out = (b.text ? b.text + '\n\n' : '') + '### Learning Objectives\n\n';
      if (b.items) out += b.items.map(i => '- ' + i).join('\n') + '\n';
      return out;
    }
    case 'definition':
      return '> **' + b.term + ':** ' + b.text + '\n';
    case 'definition_set': {
      let out = '';
      (b.items || []).forEach(it => {
        out += '> **' + it.term + ':** ' + it.text + '\n\n';
      });
      return out.trim() + '\n';
    }
    case 'framework': {
      let out = '### ' + b.name + ' (' + b.source_org + ')\n\n';
      out += '**Core Components:**\n';
      (b.components || []).forEach(c => {
        out += '- ' + c + '\n';
      });
      return out;
    }
    case 'mistakes_table': {
      let out = '### ' + (b.title || 'Common Mistakes') + '\n\n';
      out += '| Common Mistake | Recommended Evidence-Based Approach |\n| --- | --- |\n';
      (b.items || []).forEach(it => {
        out += '| **' + it.mistake + '** | ' + it.better_approach + ' |\n';
      });
      return out;
    }
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
      if (b.variant === 'important_note') badge = '**Important Guidance:** ';
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
      if (b.learning_experiences_intro) out += '**' + b.learning_experiences_intro + '**\n\n';
      if (b.learning_experiences) out += b.learning_experiences.map(a => '- ' + a).join('\n') + '\n\n';
      if (b.notes) {
        b.notes.forEach(n => { out += blockToMarkdown(n) + '\n'; });
      }
      return out;
    }
    case 'play_types': {
      let out = '#### ' + (b.title || 'Play Types') + '\n\n';
      out += '| Type of Play | What It Supports | Low-Cost / Everyday Materials |\n| --- | --- | --- |\n';
      (b.items || []).forEach(it => {
        out += '| **' + it.type_of_play + '** | ' + it.what_it_supports + ' | ' + it.low_cost_examples + ' |\n';
      });
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
      out += '| Age Range | Recommendation |\n| --- | --- |\n';
      (b.rows || []).forEach(r => {
        out += '| **' + r.age + '** | ' + r.recommendation + ' |\n';
      });
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
        out += b.discussion_questions.items.map(q => {
          let qText = q.order + '. **' + q.question + '**';
          if (q.model_answer) qText += '\n   *Model Guidance:* ' + q.model_answer;
          return qText;
        }).join('\n\n') + '\n\n';
      }
      return out;
    }
    case 'activity': {
      let out = '### Practical Activity: ' + b.title + '\n\n' + b.instructions + '\n\n';
      if (b.open_questions_intro) out += '**' + b.open_questions_intro + '**\n\n';
      if (b.open_questions) {
        out += b.open_questions.map(q => '- ' + q).join('\n') + '\n\n';
      }
      if (b.guidance) out += '> **Coaching Guidance:** ' + b.guidance + '\n\n';
      if (b.skills_supported) {
        out += '#### ' + b.skills_supported.heading + ':\n' + (b.skills_supported.intro ? b.skills_supported.intro + '\n' : '');
        out += b.skills_supported.items.map(it => '- ' + it).join('\n') + '\n\n';
      }
      if (b.baby_adaptation) {
        out += '**Infant Adaptation (0–12 Months):**\n' + b.baby_adaptation + '\n';
      }
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

const courseLessons = data.module.lessons.map((l, idx) => {
  const md = (l.blocks || []).map(blockToMarkdown).join('\n\n').trim();
  const lessonOrder = idx + 1;
  const qList = questionsMap[lessonOrder] || [];

  const lessonObj = {
    id: 'ecd-' + l.id,
    moduleId: 'ecd-m3',
    programId: 'ecd-cert',
    title: `${lessonOrder}. ${l.title}`,
    order: lessonOrder,
    hasVideo: false,
    content: md,
    coachNotes: `Guide the learner through ${l.title.toLowerCase()}, highlighting cognitive milestones, responsive caregiving, language interaction, and safe problem solving.`
  };

  if (qList.length > 0) {
    lessonObj.quiz = {
      id: `quiz-m3-l${String(lessonOrder).padStart(2, '0')}`,
      lessonId: lessonObj.id,
      programId: 'ecd-cert',
      passingScore: 70,
      questions: qList
    };
  }

  return lessonObj;
});

// Add Capstone Lesson 17: Module 3 Key Takeaways & Comprehensive 10-Question Knowledge Check Assessment
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

const keyTakeawaysMd = `### Module 3 Key Takeaways & Summary

${data.module.key_takeaways.items.map(it => `${it.order}. **${it.text}**`).join('\n\n')}

### Professional Medical & Clinical Guidance Note
${data.module.professional_note.paragraphs.join('\n\n')}

---
Complete the comprehensive 10-question Knowledge Check below to master Module 3!`;

courseLessons.push({
  id: 'ecd-m3-l17',
  moduleId: 'ecd-m3',
  programId: 'ecd-cert',
  title: '17. Module 3 Key Takeaways & Comprehensive Assessment',
  order: 17,
  hasVideo: false,
  content: keyTakeawaysMd,
  coachNotes: 'Encourage the learner to review the 10 key takeaways before taking the complete Module 3 assessment.',
  quiz: {
    id: 'quiz-m3-comprehensive',
    lessonId: 'ecd-m3-l17',
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
(data.module.references?.groups || []).forEach(g => {
  (g.items || []).forEach(it => {
    references.push({
      title: it.citation,
      url: it.url || undefined
    });
  });
});
if (references.length === 0 && Array.isArray(data.module.references?.items)) {
  data.module.references.items.forEach(it => {
    references.push({
      title: it.citation,
      url: it.url || undefined
    });
  });
}

const module3 = {
  id: 'ecd-m3',
  programId: 'ecd-cert',
  title: '3. Cognitive Development',
  order: 3,
  description: 'Understand how children aged 0–5 think, remember, and solve problems through responsive caregiving, playful exploration, language, and the Nurturing Care Framework.',
  glossary,
  references,
  lessons: courseLessons
};

const tsContent = 'import { CourseModule } from \'../types/studentPortal\';\n\n' +
  'export const MODULE_3_COGNITIVE_DEVELOPMENT: CourseModule = ' +
  JSON.stringify(module3, null, 2) + ';\n';

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'module3Data.ts'),
  tsContent,
  'utf8'
);

console.log('Successfully generated src/data/module3Data.ts with', courseLessons.length, 'lessons,', glossary.length, 'glossary terms, and', references.length, 'references!');
