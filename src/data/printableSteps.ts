export interface PrintableStep {
  step: number;
  title: string;
  instruction: string;
  image: string; // will be populated with imported images
}

export interface PrintableStepsData {
  printableId: string;
  steps: PrintableStep[];
}

// Image imports will be added as images are generated
// For now, define the step content for all 9 printables

export const printableStepsMap: Record<string, Omit<PrintableStep, 'image'>[]> = {
  'pouring-practice': [
    { step: 1, title: 'Prepare the Tray', instruction: 'Place a wooden tray on the table with two identical small pitchers side by side. Fill the left pitcher with coloured water to the marked line.' },
    { step: 2, title: 'Demonstrate the Grip', instruction: 'Wrap your dominant hand around the handle of the full pitcher. Place your other hand gently on the side for support. Lift slowly.' },
    { step: 3, title: 'Pour Slowly', instruction: 'Tilt the pitcher steadily, pouring the water into the empty pitcher in one continuous stream. Keep your eyes on the spout.' },
    { step: 4, title: 'Check for Spills', instruction: 'Set the pitcher down. Look at the tray — are there any drips? If so, use a small sponge to wipe them up.' },
    { step: 5, title: 'Pour Back', instruction: 'Now pour the water back from the second pitcher into the first, using the same careful grip and steady tilt.' },
    { step: 6, title: 'Repeat & Refine', instruction: 'Practice pouring back and forth until you can transfer all the water without spilling. Try with different-sized pitchers when ready.' },
  ],
  'cutting-strips': [
    { step: 1, title: 'Set Up the Workspace', instruction: 'Place the cutting tray on the table with child-safe scissors and a stack of pre-drawn cutting strips (straight lines first).' },
    { step: 2, title: 'Demonstrate the Scissors Grip', instruction: 'Place your thumb in the top loop and your index and middle fingers in the bottom loop. Open and close the blades slowly.' },
    { step: 3, title: 'Hold the Paper', instruction: 'Hold the paper strip in your non-dominant hand, keeping fingers away from the cutting line. The paper should be upright, not flat.' },
    { step: 4, title: 'Cut Straight Lines', instruction: 'Open the scissors wide, place the paper between the blades along the line, and close with one smooth snip. Repeat along the line.' },
    { step: 5, title: 'Progress to Zigzag Lines', instruction: 'Once straight cuts are mastered, move to zigzag strips. Turn the paper — not the scissors — to follow the angles.' },
    { step: 6, title: 'Try Curved Lines', instruction: 'For curves, feed the paper slowly while making small, continuous snips. Rotate the paper gently to follow the curve.' },
    { step: 7, title: 'Clean Up', instruction: 'Collect all cut pieces. Place scraps in the recycling bowl and return the scissors to the tray, blades closed.' },
  ],
  'spooning-sorting': [
    { step: 1, title: 'Prepare the Tray', instruction: 'Place a wooden tray on the table with two small ceramic bowls side by side. Fill the left bowl with dried beans or lentils. Place one wooden spoon beside the bowls.' },
    { step: 2, title: 'Demonstrate the Spoon Grip', instruction: 'Hold the spoon with your dominant hand using a three-finger grip (thumb, index, middle). Rest the handle against the curve between thumb and index finger.' },
    { step: 3, title: 'Scoop the Beans', instruction: 'Dip the spoon into the full bowl and scoop a small amount of beans. Lift slowly and steadily, keeping the spoon level.' },
    { step: 4, title: 'Transfer to the Empty Bowl', instruction: 'Move the spoon over the empty bowl and tilt gently to release the beans. Listen to them drop — try not to spill any.' },
    { step: 5, title: 'Continue Transferring', instruction: 'Repeat scooping and transferring until all beans have moved from the left bowl to the right bowl.' },
    { step: 6, title: 'Check for Strays', instruction: 'Look at the tray and table — pick up any stray beans with your fingers and place them in the bowl.' },
    { step: 7, title: 'Transfer Back & Reset', instruction: 'Now spoon all the beans back to the original bowl. When finished, return the tray to the shelf exactly as you found it.' },
  ],
  'sandpaper-letters': [
    { step: 1, title: 'Select a Letter', instruction: 'Choose one sandpaper letter card from the box. Begin with letters from sounds the child already knows (e.g., /m/, /s/, /a/).' },
    { step: 2, title: 'Introduce the Sound', instruction: 'Hold up the letter and say the sound clearly: "This is /m/." Do not say the letter name — always use the phonetic sound.' },
    { step: 3, title: 'Trace with Two Fingers', instruction: 'Place your index and middle fingers at the starting point of the letter. Trace the sandpaper letter slowly, following the correct stroke direction. Say the sound as you trace.' },
    { step: 4, title: 'Invite the Child to Trace', instruction: 'Say: "Would you like to try?" Guide the child to place their fingers on the starting point and trace while saying the sound aloud.' },
    { step: 5, title: 'Three-Period Lesson — Naming', instruction: 'Place two or three letters on the mat. Point to each and say: "This is /m/. This is /s/."' },
    { step: 6, title: 'Three-Period Lesson — Recognition', instruction: 'Ask: "Can you show me /m/?" and "Can you show me /s/?" Let the child point to the correct letter.' },
    { step: 7, title: 'Three-Period Lesson — Recall', instruction: 'Point to a letter and ask: "What sound is this?" The child names the sound independently.' },
    { step: 8, title: 'Return to the Shelf', instruction: 'Place the letters back in the box in order. Return the box to its place on the language shelf.' },
  ],
  'number-rods': [
    { step: 1, title: 'Carry the Rods to the Mat', instruction: 'Unroll a long work mat. Carry each rod individually from the shelf, holding it with two hands — one at each end. Place them randomly on the mat.' },
    { step: 2, title: 'Arrange in Order', instruction: 'Find the shortest rod (1). Place it at the top right of the mat. Find each next rod and place it below, aligned at the left edge, building a staircase.' },
    { step: 3, title: 'Count Rod 1', instruction: 'Touch the red section of the first rod and say "one." This rod represents the quantity 1.' },
    { step: 4, title: 'Count Rod 2', instruction: 'Slide your finger along rod 2, touching each colour section: "one… two." Emphasise the last number — "This is two."' },
    { step: 5, title: 'Continue Counting', instruction: 'Repeat for rods 3 through 10, counting each section aloud and emphasising the final number.' },
    { step: 6, title: 'Match Number Cards', instruction: 'Lay out number cards 1–10. Place each card beside its corresponding rod. Count to verify each match.' },
    { step: 7, title: 'Return the Material', instruction: 'Remove the number cards first, placing them in order in the card box. Then carry each rod back to the shelf one at a time, longest first.' },
  ],
  'pink-tower-patterns': [
    { step: 1, title: 'Carry the Cubes', instruction: 'Carry each cube individually from the shelf to the mat, starting with the largest. Use two hands for big cubes; pincer grip for the smallest.' },
    { step: 2, title: 'Find the Largest Cube', instruction: 'Look at all ten cubes scattered on the mat. Find the largest one and place it in the centre of the mat.' },
    { step: 3, title: 'Build the Tower', instruction: 'Find the next largest cube and place it centred on top. Continue stacking in order from largest to smallest, aligning each cube carefully.' },
    { step: 4, title: 'Observe the Tower', instruction: 'Step back and look at the tower from the side and from above. Notice how each cube is exactly 1 cm smaller than the one below.' },
    { step: 5, title: 'Horizontal Pattern', instruction: 'Dismantle the tower. Lay all cubes in a row from largest to smallest, edges aligned, to form a horizontal staircase.' },
    { step: 6, title: 'Spiral Pattern', instruction: 'Arrange the cubes in a spiral, starting with the largest in the centre and winding outward to the smallest.' },
    { step: 7, title: 'Return to the Shelf', instruction: 'Carry each cube back to the shelf one at a time, placing them in order from largest (bottom) to smallest (top).' },
  ],
  'continent-coloring': [
    { step: 1, title: 'Identify the Continent', instruction: 'Look at the map outline. Name the continent shown: Africa, Europe, Asia, North America, South America, Australia, or Antarctica.' },
    { step: 2, title: 'Select the Montessori Colour', instruction: 'Each continent has a standard Montessori colour: Africa — green, Europe — red, Asia — yellow, North America — orange, South America — pink, Australia — brown, Antarctica — white.' },
    { step: 3, title: 'Colour the Land Area', instruction: 'Using the correct colour pencil, colour the continent carefully within the outline. Use smooth, even strokes in one direction.' },
    { step: 4, title: 'Colour the Oceans', instruction: 'Use a blue pencil to colour the water areas surrounding the continent. Leave a small white gap between land and water edges if desired.' },
    { step: 5, title: 'Label the Continent', instruction: 'Write the continent name neatly below or beside the map. Use the Montessori moveable alphabet if the child is not yet writing.' },
    { step: 6, title: 'Add Key Features', instruction: 'Mark major features: large countries, mountain ranges, or rivers. Use the globe or puzzle map as a reference.' },
    { step: 7, title: 'Compare with the Globe', instruction: 'Hold your coloured map next to the Montessori globe. Find your continent on the globe and compare the shape and colour.' },
  ],
  'grace-courtesy-cards': [
    { step: 1, title: 'Choose a Scenario Card', instruction: 'Spread the scenario cards face-up on a mat. Invite the child to choose one that interests them — for example, "Greeting a Friend."' },
    { step: 2, title: 'Read the Scenario', instruction: 'Read the card aloud together. Discuss what is happening in the picture: Who is involved? Where are they?' },
    { step: 3, title: 'Model the Behaviour', instruction: 'Demonstrate the polite behaviour shown on the card. For a greeting: stand, make eye contact, smile, and say "Good morning."' },
    { step: 4, title: 'Role-Play Together', instruction: 'Invite the child to practise with you. Take turns being each person in the scenario. Use gentle coaching: "Remember to look at their eyes."' },
    { step: 5, title: 'Discuss Why It Matters', instruction: 'Ask: "How do you think the other person feels when you greet them?" Help the child connect the behaviour to kindness and community.' },
    { step: 6, title: 'Try a New Scenario', instruction: 'Choose another card — perhaps "Saying Excuse Me" or "Setting the Table." Repeat the read, model, and role-play cycle.' },
    { step: 7, title: 'Return the Cards', instruction: 'Stack the cards neatly and place them back in their box on the Grace & Courtesy shelf.' },
  ],
  'leaf-shapes': [
    { step: 1, title: 'Unbox the Three-Part Cards', instruction: 'Lay out the complete set of leaf shape cards on a mat. Each set has three parts: the picture card, the label card, and the control card (picture + label together).' },
    { step: 2, title: 'Introduce the First Leaf Shape', instruction: 'Hold up one control card — for example, "Ovate." Say: "This leaf shape is called ovate. It looks like an egg." Trace the outline with your finger.' },
    { step: 3, title: 'Match Picture to Control', instruction: 'Place the control cards in a column. Give the child the separate picture cards and invite them to match each picture to its control card.' },
    { step: 4, title: 'Add the Labels', instruction: 'Once pictures are matched, give the child the label cards. Have them place each label beneath the correct picture card.' },
    { step: 5, title: 'Self-Check with Controls', instruction: 'Flip the control cards over or compare side-by-side. The child verifies their matches independently — this is the control of error.' },
    { step: 6, title: 'Nature Walk Connection', instruction: 'Take a short walk outdoors. Collect real leaves and bring them back to the mat. Match each real leaf to its corresponding card.' },
    { step: 7, title: 'Leaf Press Extension', instruction: 'Press a favourite leaf between wax paper inside a heavy book. After a few days, mount it on card stock and label the shape.' },
  ],
};
