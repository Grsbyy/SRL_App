import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Other = ({ navigation }) => {
    
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };  
  const [searchText, setSearchText] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalVisible, setModalVisible] = useState(false);

  const academicStrategies = [
    { name: 'Pomodoro Technique', type: 'Breaks study sessions into intervals, typically 25 minutes of focused work followed by a short break.', description: 'Instructions: Set a timer for 25 minutes and work on a specific task without interruption. Take a 5-minute break after each session, and after four sessions, take a longer break.' },
    { name: 'Cornell Note-Taking ', type: 'Structured note-taking method with sections for main ideas, key points, and summaries.', description: 'Instructions: Divide your note paper into three sections: cues/questions, notes, and a summary. Take notes during class or while reading, then summarize the main points in the bottom section.' },
    { name: 'Reward System', type: 'Establishing incentives or rewards for achieving academic milestones or completing tasks.', description: 'Instructions: Set specific goals or milestones and define rewards for reaching them, such as a break, a treat, or a fun activity. Use rewards as motivation to stay focused and productive.' },
    { name: 'Time Blocking', type: 'Allocating specific blocks of time for different tasks or activities.', description: 'Instructions: Divide your day into blocks of time dedicated to studying, attending classes, leisure activities, and other commitments. Prioritize tasks and allocate time accordingly, minimizing distractions during focused study sessions.' },
    { name: 'Mindful Breathing', type: 'Using controlled breathing techniques to reduce stress, enhance focus, and regulate emotions.', description: 'Instructions: Find a quiet, comfortable space, sit or lie down, and focus on your breath. Inhale deeply through your nose, hold for a moment, and exhale slowly through your mouth. Repeat several times, paying attention to the sensation of each breath.' },
    { name: 'Feynman Technique', type: 'Explaining concepts or ideas in simple terms as if teaching them to a beginner, to enhance understanding and retention.', description: "Instructions: Choose a concept or topic you want to understand better. Explain it in simple, clear language as if teaching it to someone unfamiliar with the subject. Identify gaps in your understanding and revise your explanation as needed." },
    { name: 'Leitner System', type: 'A flashcard-based spaced repetition system that uses a series of boxes to organize and review flashcards based on recall difficulty.', description: "Instructions: Start with all flashcards in Box 1. Review each flashcard, and if answered correctly, move it to the next box; if answered incorrectly, return it to Box 1. Continue reviewing until all flashcards reach the final box, indicating mastery." },
    { name: 'SQ3R Method', type: 'A reading comprehension strategy involving Survey, Question, Read, Recite, and Review.', description: "Instructions: Survey the text to get an overview, generate questions based on headings and key points, read actively while seeking answers to questions, recite key points aloud or in writing, and review the material to reinforce learning." },
    { name: 'PQ4R Method', type: 'A reading comprehension strategy that stands for Preview, Question, Read, Reflect, Recite, and Review.', description: "Instructions: Preview the text to get an overview, generate questions based on headings and key points, read actively while seeking answers to questions, reflect on the material, recite key points, and review to reinforce learning." },
    { name: 'Blurting Method', type: 'A technique that involves blurting out responses or ideas without filtering or self-censorship to encourage spontaneous thinking and creativity.', description: "Instructions: Set a timer for a specified period (e.g., 5 minutes) and jot down or verbalize as many ideas, solutions, or insights as possible without pausing to evaluate or edit them. Embrace the freedom to express thoughts without judgment." },
    { name: 'Flowtime Technique', type: 'A time management technique that involves identifying and dedicating uninterrupted periods of time (Flowtime) to focus on specific tasks or projects.', description: "Instructions: Block out distractions and interruptions during Flowtime periods, committing to sustained, concentrated effort on a single task or project. Aim to enter a state of flow where you are fully immersed and productive." },
    { name: 'Animedoro Technique', type: 'A variation of the Pomodoro Technique that uses anime episodes as work intervals and short breaks for relaxation.', description: "Instructions: Set a timer for the duration of an anime episode (e.g., 20-25 minutes) as your work interval, followed by a short break (5 minutes) to relax or enjoy another episode. Repeat the cycle until your task is complete." },
    { name: 'Eat that Frog Technique', type: 'A productivity strategy based on the idea of tackling the most challenging or important task (the "frog") first each day.', description: "Instructions: Identify your most important or daunting task for the day (the 'frog') and prioritize it as your first task. Break the task into smaller, manageable steps and commit to completing it before moving on to other tasks." },
    { name: '52/17 Rule', type: ' A time management principle that suggests working for 52 minutes followed by a 17-minute break to optimize productivity and focus.', description: "Instructions: Set a timer for 52 minutes and work on a specific task with focused attention. After the 52-minute work period, take a 17-minute break to rest, recharge, and rejuvenate before returning to work." },
    { name: 'Eisenhower Matrix', type: "A prioritization tool that categorizes tasks based on urgency and importance into four quadrants: Do First, Schedule, Delegate, and Don't Do.", description: "Instructions: List all tasks and responsibilities, then assign each task to one of the four quadrants based on its urgency and importance. Prioritize tasks in the 'Do First' quadrant and delegate or eliminate tasks in the other quadrants accordingly." },
    { name: 'GTD Method', type: 'The "Getting Things Done" method, a productivity system for organizing tasks and commitments to reduce stress and increase efficiency.', description: "Instructions:  Capture all tasks, ideas, and commitments into a trusted system, then clarify their purpose and desired outcomes, organize them into actionable lists, review and engage with the lists regularly, and take action on tasks based on context and priority." },
    { name: 'Seinfeld Method', type: 'A technique for building habits and consistency by maintaining a visual chain of completed tasks or activities over consecutive days.', description: "Instructions: Set a daily goal or habit you want to establish, then track your progress by marking each successful completion on a calendar or tracking sheet. Aim to maintain an unbroken chain of completed days to reinforce the habit and motivation." },
    { name: 'Pareto Analysis', type: 'A decision-making technique based on the Pareto Principle, which suggests that roughly 80% of effects come from 20% of causes.', description: "Instructions: Identify the most significant factors contributing to a problem or outcome, typically the top 20%, and focus efforts on addressing these high-impact areas to achieve maximum results." },
    { name: "Parkinson’s Law", type: 'The adage that work expands to fill the time available for its completion, implying that tasks often take longer than necessary due to perceived deadlines.', description: "Instructions: Set realistic deadlines or time limits for tasks to prevent inefficiency and procrastination. Allocate specific, focused time frames for tasks to avoid the trap of excessive time consumption." },
    { name: 'Rapid Planning Method (RPM)', type: 'A time management and productivity system developed by Tony Robbins, emphasizing outcome-focused thinking and action planning.', description: "Instructions:  Identify your desired outcomes (results or goals) in each area of life, clarify reasons and motivations behind these outcomes, determine specific actions necessary to achieve them, and create a detailed plan with deadlines and accountability measures." },
    { name: 'Pickle Jar Theory', type: 'An analogy comparing time and priorities to a jar filled with pickles, suggesting that if you fill the jar with small tasks (pickles) first, there is no room for larger, more important tasks (big rocks).', description: "Instructions: Prioritize important tasks (big rocks) before addressing smaller, less critical tasks (pickles). Allocate time and resources based on the significance and impact of each task to ensure essential priorities are addressed first." },
    { name: 'SMART Goal System', type: 'An acronym for Specific, Measurable, Achievable, Relevant, and Time-bound, used to set clear and actionable goals.', description: "Instructions:  Define goals that are Specific (clear and well-defined), Measurable (quantifiable), Achievable (realistic and attainable), Relevant (aligned with broader objectives), and Time-bound (with a deadline or timeframe for completion) to increase clarity, motivation, and accountability." },
    { name: 'Reverse Pomodoro Strategy', type: 'A variation of the Pomodoro Technique where short breaks are taken before focused work intervals, aiming to maintain sustained focus and productivity.', description: "Instructions: Start with a short break (e.g., 5 minutes) to relax and clear the mind before beginning a focused work interval (e.g., 25 minutes). Use the break to mentally prepare, stretch, or engage in a brief relaxation activity to enhance productivity during the work session." },
    { name: 'Energy Mapping Strategy', type: 'A technique for identifying and managing energy levels throughout the day to optimize productivity and well-being.', description: "Instructions: Track energy levels and mood fluctuations throughout the day using a visual map or journal. Identify peak energy periods and low-energy times to schedule tasks accordingly, matching high-demand activities with peak energy levels and low-demand tasks with lower energy periods. Incorporate activities that replenish energy, such as breaks, exercise, or relaxation techniques, to maintain balance and prevent burnout." },
    { name: 'Kanban Board', type: 'A visual project management tool that uses cards and columns to represent tasks and their stages of completion.', description: "Instructions: Create a board with columns representing different stages of a project (e.g., To-Do, In Progress, Done). Write tasks on cards and move them across columns as they progress from idea to completion, allowing for visualization of workflow and task status." },
    { name: 'Do Deep Work', type: 'Focusing intensely on cognitively demanding tasks without distractions or interruptions.', description: "Instructions: Create a conducive environment for deep work by eliminating distractions, setting specific time blocks for focused work, and immersing yourself in challenging tasks that require sustained concentration and cognitive effort, aiming for high-quality results." },
    { name: 'Objectives and Key Results', type: 'A goal-setting framework used to define objectives and measurable key results to track progress and achieve desired outcomes.', description: "Instructions: Divide projects into short iterations (sprints), typically 2-4 weeks long, with defined goals and deliverables. Hold regular meetings (e.g., daily stand-ups, sprint reviews) to track progress, address challenges, and adapt plans based on feedback and changing requirements." },
    { name: 'BoJo - The Bullet Journal', type: 'A customizable analog system for note-taking, organization, and task management, utilizing bulleted lists, symbols, and rapid logging.', description: "Instructions: Use a blank notebook to create a personalized journal with sections for daily logs, monthly calendars, task lists, and notes. Utilize symbols and shorthand to quickly capture and organize information, track habits, and manage tasks and events." },
    { name: '1-3-5 Rule', type: 'A prioritization technique where you aim to accomplish one big task, three medium tasks, and five small tasks each day.', description: "Instructions: Start your day by identifying one major task, three moderate tasks, and five minor tasks to tackle. Focus on completing these tasks in priority order, ensuring progress toward larger goals while maintaining productivity." },
    { name: '168 Hours', type: 'A time management philosophy that emphasizes the finite nature of time and encourages intentional allocation of hours across various aspects of life.', description: "Instructions: Reflect on how you spend your 168 hours each week, considering work, sleep, leisure, personal development, relationships, and other commitments. Strive to optimize time allocation to align with priorities and values, ensuring a balanced and fulfilling life." },
    { name: '10 Minutes', type: 'A technique for overcoming procrastination by committing to work on a task for just 10 minutes.', description: "Instructions: Start a timer and work on the task for a minimum of 10 minutes, focusing solely on getting started without worrying about completion. Often, once you begin, momentum builds, and it becomes easier to continue working beyond the initial 10 minutes." },
    { name: '18 Minutes', type: "A time management technique outlined in Peter Bregman's book '18 Minutes: Find Your Focus, Master Distraction, and Get the Right Things Done.'", description: "Instructions: Allocate 18 minutes each day to plan your day (5 minutes), review goals and progress (1 minute), and focus on one task at a time (12 minutes). By dedicating focused attention to important priorities, you can increase productivity and effectiveness." },
    { name: '90 Minute Focus Session', type: 'A productivity strategy based on the idea that the brain operates in 90-minute cycles of focused attention.', description: "Instructions: Set aside uninterrupted blocks of 90 minutes to work on a single task or project, minimizing distractions and maintaining sustained focus. After each session, take a short break to rest and recharge before starting the next focus session." },
    { name: '4D system', type: ' A task management approach based on four categories: Do, Delegate, Defer, and Delete.', description: "Instructions: Sort tasks into categories based on urgency and importance: Do (immediate action required), Delegate (assign to someone else), Defer (schedule for later), or Delete (eliminate if not necessary). Prioritize tasks based on their impact and relevance to goals." },
    { name: 'ABCDE', type: 'A prioritization technique developed by Brian Tracy, where tasks are categorized based on importance and urgency.', description: "Instructions: Assign each task a letter (A, B, C, D, or E) based on its priority level: A (urgent and important), B (important but not urgent), C (nice to do but not critical), D (delegate), or E (eliminate). Focus on completing high-priority tasks first to maximize productivity and impact." },
    { name: 'Agile Results‍', type: 'A productivity framework developed by J.D. Meier, blending principles from agile software development with personal productivity strategies.', description: "Instructions: Break down goals into actionable steps, use time management techniques such as time blocking and prioritization, and regularly review and adjust plans to adapt to changing circumstances and priorities." },
    { name: 'Autofocus', type: 'A task management method designed by Mark Forster to address procrastination and overwhelm.', description: "Instructions: Scan a list of tasks and choose the one that stands out to you the most. Focus on that task until completion or until you feel compelled to switch tasks. Continue this process iteratively to make progress on multiple tasks without feeling overwhelmed." },
    { name: 'Biological Prime Time', type: 'The period of the day when you are naturally most alert, focused, and productive.', description: "Instructions: Identify your peak performance hours, typically based on circadian rhythms and personal energy patterns. Schedule high-priority tasks, creative work, and challenging projects during your biological prime time to leverage your natural energy and cognitive abilities. " },
    { name: 'Dave Lee’s System', type: 'A time management approach developed by productivity coach Dave Lee, emphasizing focus, simplicity, and intentionality.', description: "Instructions: Prioritize tasks based on impact and alignment with goals, use time blocking to allocate dedicated periods for focused work, and regularly review and adjust plans to stay on track and maintain balance. " },
    { name: 'Fresh or Fried', type: 'A concept introduced by Todd Henry, highlighting the importance of managing energy levels and avoiding burnout.', description: "Instructions: Recognize when you are at your best (fresh) and when you are fatigued or depleted (fried). Schedule demanding tasks or creative work during peak energy periods and reserve low-energy times for routine or less demanding activities." },
    { name: 'Iceberg Method', type: 'A metaphor illustrating the depth and complexity of underlying issues or tasks, where only a small portion is visible above the surface.', description: "Instructions: When faced with a complex problem or task, recognize that what is visible (the tip of the iceberg) represents only a fraction of the total scope. Dive deeper to uncover underlying causes, implications, and solutions hidden beneath the surface." },
    { name: 'Inbox Zero', type: 'A productivity approach developed by Merlin Mann, aiming to keep email inboxes empty or near-empty through efficient processing and organization.', description: "Instructions: Process emails promptly, categorize them into action items, reference material, or archives, and strive to maintain an empty inbox through regular processing and prioritization. Adopt habits and tools to streamline email management and reduce overwhelm." },
    { name: 'Ivy Lee', type: 'A time management method attributed to productivity consultant Ivy Lee, involving prioritizing tasks and focusing on the most important activities each day.', description: "Instructions: At the end of each day, write down the six most important tasks to accomplish the next day. Prioritize these tasks in order of importance, and focus on completing them one at a time the following day, avoiding distractions and interruptions." },
    { name: 'MITs', type: 'An acronym for Most Important Tasks, referring to the key activities or objectives that have the highest impact on your goals.', description: "Instructions:  Identify and prioritize the two or three Most Important Tasks to accomplish each day. Focus on completing these tasks before addressing less critical or lower-priority activities, ensuring progress toward your overarching objectives." },
    { name: 'MoSCoW', type: "A prioritization technique used in project management, categorizing requirements into Must-have, Should-have, Could-have, and Won't-have categories.", description: "Instructions: Evaluate project requirements or tasks based on their importance and urgency, categorizing them into Must-have (essential for project success), Should-have (important but not critical), Could-have (nice to have if resources allow), and Won't-have (deferred or eliminated) categories to guide decision-making and resource allocation." },
    { name: 'POSEC', type: ' A prioritization framework introduced by Stephen Covey in "The 7 Habits of Highly Effective People," emphasizing the importance of defining roles and priorities.', description: "Instructions: Clarify your Purpose (your mission or overarching goal), define your Objectives (specific outcomes you want to achieve), identify your Strategies (plans or approaches to accomplish objectives), establish your Execution (specific actions to implement strategies), and maintain a Continuous improvement mindset to adapt and grow over time." },
    { name: 'RACI Matrix', type: 'A responsibility assignment matrix used in project management to clarify roles and responsibilities for tasks and decisions.', description: "Instructions: Define roles and responsibilities for each task or decision by categorizing individuals as Responsible (responsible for completing the task), Accountable (ultimately answerable for the task's success or failure), Consulted (providing input or expertise), or Informed (kept informed of progress or outcomes) within the matrix." },
    { name: 'Not-to-do list', type: 'A list of activities, habits, or commitments that you intentionally avoid to minimize distractions, conserve energy, and focus on priorities.', description: "Instructions: Identify behaviors, tasks, or commitments that drain time and energy without adding value or aligning with your goals. Create a list of things you choose not to do or limit to maintain focus, boundaries, and balance in your life and work." },
    { name: 'The Now Habit/Unscheduling', type: 'A book by Neil Fiore that offers strategies for overcoming procrastination and fostering productivity through structured relaxation and guilt-free leisure time.', description: "Instructions: Schedule regular periods of unscheduled time for leisure, relaxation, and activities that rejuvenate and recharge you. By balancing work with intentional downtime, you can reduce stress, prevent burnout, and maintain sustainable productivity over the long term." },
    { name: 'Jar Glass', type: 'A metaphor illustrating the importance of prioritizing essential tasks and commitments (big rocks) before addressing less critical or time-consuming activities (sand and water).', description: "Instructions: Prioritize high-impact tasks and commitments that align with your goals and values (big rocks) before attending to minor or less significant activities (sand and water). By allocating time and energy to important priorities first, you ensure progress toward meaningful objectives." },
    { name: 'Swiss Cheese Method/Salami Method', type: 'A strategy for overcoming procrastination and tackling large tasks or projects by breaking them down into smaller, more manageable steps.', description: "Instructions: Divide complex or overwhelming tasks into smaller, bite-sized chunks that are easier to approach and accomplish. By taking incremental steps and making progress one slice at a time, you can gradually chip away at larger goals and overcome inertia or resistance." },
    { name: 'Triage Technique', type: 'A prioritization method borrowed from emergency medicine, used to assess and categorize tasks or issues based on urgency and importance.', description: "Instructions: Evaluate tasks or requests based on their urgency and importance, categorizing them into different levels of priority: immediate action required (urgent and important), scheduled or deferred action (important but not urgent), or delegate or dismiss (not urgent or important). Prioritize tasks accordingly to maximize efficiency and address critical needs first." },
    { name: 'Who’s Got the Monkey', type: 'A metaphorical concept from management literature, illustrating the transfer of responsibility and accountability for tasks or decisions between individuals.', description: "Instructions: Monitor and manage the distribution of tasks and responsibilities within teams or organizations, ensuring clarity and ownership for each task. Avoid situations where tasks become 'monkeys' passed between individuals, leading to confusion, delays, and inefficiencies. Instead, empower team members to take ownership and accountability for their assigned tasks." },
    { name: 'Zen to Done', type: "A productivity system inspired by David Allen's Getting Things Done (GTD) methodology and Zen principles, focusing on simplicity, mindfulness, and habit formation.", description: "Instructions: Simplify your workflow by focusing on essential tasks and minimizing distractions. Develop habits for capturing, processing, organizing, reviewing, and executing tasks consistently. Cultivate mindfulness and present-moment awareness to maintain focus and balance in your personal and professional life." },
    { name: 'Time blocking', type: 'A time management method that involves scheduling specific time blocks for different tasks, activities, or projects throughout the day.', description: "Instructions: Allocate dedicated periods of time on your calendar for various activities, such as work tasks, meetings, personal commitments, and leisure. By blocking time for each activity, you create a structured schedule that maximizes productivity, minimizes distractions, and ensures balanced time allocation." },
    { name: 'Timeboxing', type: 'A time management technique where specific time blocks (boxes) are allocated for tasks, activities, or projects.', description: "Instructions: Set aside dedicated time blocks for different tasks or activities, limiting the duration to prevent overcommitment and encourage focused, efficient work. By boxing time, you create structure, accountability, and boundaries to optimize productivity and manage priorities effectively." },


 
  ];

  const handleSearch = () => {
    const filtered = academicStrategies.filter(strategy => strategy.name.toLowerCase().includes(searchText.toLowerCase()));
    setSelectedStrategy(null); // Reset selected strategy
    setSearchText(''); // Clear search text
    setFilteredStrategies(filtered);
  };


  const isTypeSelected = (type) => {
    return selectedTypes.includes(type);
  };

  const selectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const filterStrategies = () => {
    return academicStrategies.filter(strategy => selectedTypes.length === 0 || selectedTypes.includes(strategy.type)).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Academic Strategies</Text>
        {!selectedStrategy && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="filter" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollContainer}>
        {selectedStrategy ? (
          <StratDetails strategy={selectedStrategy} onClose={() => setSelectedStrategy(null)} />
        ) : (
          <View style={styles.section}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Academic Strategies"
              value={searchText}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
            {filterStrategies().map((strategy, index) => (
              <TouchableOpacity key={index} onPress={() => selectStrategy(strategy)}>

                <Text style={styles.strategyButton}>{strategy.name} </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter by Learning Strategy</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={[styles.filterButton, { marginTop: 10 }]} onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                <Text>Sort {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const StratDetails = ({ strategy, onClose }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Strategy Details</Text>
      <Text style={styles.strategyName}>{strategy.name}</Text>
      <Text style={styles.strategyType}>Type: {strategy.type}</Text>
      <Text style={styles.strategyDescription}>{strategy.description}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    paddingBottom: 90, 
    
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    
  },
  section: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  strategyButton: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue', // Add color to make it clickable
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#8a5dfb',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  backButton: {
    color: 'blue',
    marginTop: 10,
  },
  strategyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  strategyType: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  strategyDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  selectedFilter: {
    backgroundColor: 'blue',
    color: 'white',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#FF5733",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Other;
