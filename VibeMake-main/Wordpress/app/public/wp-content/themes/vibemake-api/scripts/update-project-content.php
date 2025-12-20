<?php
/**
 * Script to update project content with more substantial information
 * Run with: wp eval-file wp-content/themes/vibemake-api/scripts/update-project-content.php
 */

// Project content updates
$project_updates = [
    'neural-dreams' => [
        'content' => '<h2>About Neural Dreams</h2>
<p>Neural Dreams is an experimental AI-generated art series that explores the intersection of machine learning and human creativity. Using advanced neural networks trained on thousands of artistic masterpieces, this project creates dreamlike visualizations that blur the line between reality and imagination.</p>

<h3>The Creative Process</h3>
<p>Each piece in the Neural Dreams collection begins with a simple text prompt that describes an emotion, scene, or abstract concept. The AI then interprets these prompts through multiple layers of neural processing, creating unique visual representations that often surprise even their creators.</p>

<p>The project utilizes a combination of:</p>
<ul>
<li>Generative Adversarial Networks (GANs) for image synthesis</li>
<li>Style transfer algorithms to blend artistic movements</li>
<li>Custom-trained models on specific artistic styles</li>
<li>Post-processing techniques for color grading and enhancement</li>
</ul>

<h3>Artistic Vision</h3>
<p>Neural Dreams challenges traditional notions of authorship and creativity. By collaborating with AI, we explore new forms of artistic expression that were previously impossible. Each piece is both a technical achievement and an emotional journey, inviting viewers to find their own meanings in the abstract forms and colors.</p>

<h3>Technical Details</h3>
<p>The project leverages cutting-edge machine learning frameworks and custom algorithms to achieve its unique aesthetic. Each image goes through multiple iterations, with the AI refining its output based on aesthetic scoring algorithms and human feedback.</p>',
        'fields' => [
            'project_tools' => 'Stable Diffusion, MidJourney, RunwayML',
            'genre' => 'Digital Art / AI Art',
            'duration' => 'Ongoing Series'
        ]
    ],
    'crescent-moon-jazz' => [
        'content' => '<h2>About Crescent Moon Jazz</h2>
<p>Crescent Moon Jazz is an AI-composed jazz album that pays homage to the golden age of jazz while pushing the boundaries of what\'s possible with artificial intelligence in music composition. This groundbreaking project demonstrates how AI can understand and recreate the complex improvisational nature of jazz.</p>

<h3>The Album</h3>
<p>Featuring 8 original tracks, Crescent Moon Jazz takes listeners on a journey through various jazz subgenres:</p>
<ul>
<li><strong>Midnight Blues</strong> - A soulful opener that sets the mood</li>
<li><strong>Algorithmic Swing</strong> - Up-tempo big band inspired piece</li>
<li><strong>Neural Ballad</strong> - A touching slow number showcasing AI\'s emotional range</li>
<li><strong>Bebop Bytes</strong> - Fast-paced bebop with complex chord progressions</li>
<li><strong>Digital Django</strong> - Gypsy jazz inspired by Django Reinhardt</li>
<li><strong>Machine Learning Blues</strong> - Traditional 12-bar blues with a modern twist</li>
<li><strong>Quantum Quartet</strong> - Experimental fusion piece</li>
<li><strong>Sunset Serenade</strong> - A peaceful closer reminiscent of Bill Evans</li>
</ul>

<h3>Production Process</h3>
<p>The album was created using advanced AI music generation models trained on thousands of hours of jazz recordings. The AI learned not just the notes and chords, but the subtle nuances that make jazz so expressive - the slight timing variations, the interplay between instruments, and the spontaneous nature of improvisation.</p>

<h3>Musicians and Instruments</h3>
<p>While entirely AI-generated, the album features virtual representations of classic jazz instruments:</p>
<ul>
<li>Piano (lead and comping)</li>
<li>Upright bass</li>
<li>Drum kit (with brushes and sticks)</li>
<li>Tenor and alto saxophone</li>
<li>Trumpet with Harmon mute</li>
<li>Guitar (acoustic and electric)</li>
</ul>

<h3>Critical Reception</h3>
<p>Crescent Moon Jazz has been praised by both jazz enthusiasts and AI researchers for its authentic feel and innovative approach to music generation. The album demonstrates that AI can not only mimic existing styles but create genuinely moving musical experiences.</p>',
        'fields' => [
            'project_tools' => 'MuseNet, Jukebox AI, Ableton Live',
            'genre' => 'Jazz / AI-Generated Music',
            'duration' => '42:30',
            'project_views' => 15000
        ]
    ],
    'retro-funk-vibes' => [
        'content' => '<h2>About Retro Funk Vibes</h2>
<p>Retro Funk Vibes is a vibrant AI-generated funk album that captures the essence of 1970s funk while incorporating modern production techniques. This project showcases how artificial intelligence can understand and recreate the groove, rhythm, and soul that defined an era.</p>

<h3>The Funk Experience</h3>
<p>Spanning 10 high-energy tracks, Retro Funk Vibes delivers:</p>
<ul>
<li><strong>Funky Algorithm</strong> - Opening with a killer bass line and horn section</li>
<li><strong>Digital Groove Machine</strong> - Featuring a talk-box style vocal effect</li>
<li><strong>Silicon Soul</strong> - Slow funk with emotional depth</li>
<li><strong>Byte-Sized Funk</strong> - Short, punchy instrumental</li>
<li><strong>Neural Network Nights</strong> - Disco-funk crossover</li>
<li><strong>Computational Groove</strong> - Complex polyrhythmic patterns</li>
<li><strong>AI Got The Funk</strong> - Tribute to Parliament-Funkadelic</li>
<li><strong>Machine Learning Boogie</strong> - Dance floor filler</li>
<li><strong>Robotic Romance</strong> - Smooth funk ballad</li>
<li><strong>Funky Future</strong> - Closing with a vision of tomorrow\'s funk</li>
</ul>

<h3>Production Techniques</h3>
<p>The AI was trained on classic funk recordings from legends like James Brown, George Clinton, Bootsy Collins, and Sly Stone. It learned to recognize and recreate:</p>
<ul>
<li>The "one" - emphasizing the first beat of every measure</li>
<li>Syncopated bass lines that drive the groove</li>
<li>Tight horn sections with punchy stabs</li>
<li>Wah-wah guitar effects and chicken scratch rhythm</li>
<li>Call-and-response vocal patterns</li>
<li>Classic analog synthesizer sounds</li>
</ul>

<h3>Sound Design</h3>
<p>Special attention was paid to recreating the warm, analog sound of the 70s:</p>
<ul>
<li>Tape saturation emulation for warmth</li>
<li>Vintage compressor modeling</li>
<li>Analog-style EQ curves</li>
<li>Spring reverb for authentic ambience</li>
<li>Vinyl crackle and warmth added in post</li>
</ul>

<h3>Cultural Impact</h3>
<p>Retro Funk Vibes has been featured in several documentaries about AI in music and has inspired a new generation of producers to explore the intersection of artificial intelligence and funk music. The project proves that AI can capture not just the technical aspects of music, but also its soul and cultural significance.</p>',
        'fields' => [
            'project_tools' => 'AIVA, FL Studio, Vintage Console Emulation',
            'genre' => 'Funk / Soul / AI Music',
            'duration' => '38:45',
            'project_views' => 8500
        ]
    ]
];

// Update each project
foreach ($project_updates as $slug => $data) {
    $post = get_page_by_path($slug, OBJECT, 'community_project');
    
    if ($post) {
        // Update post content
        $post_data = [
            'ID' => $post->ID,
            'post_content' => $data['content']
        ];
        
        $result = wp_update_post($post_data);
        
        if ($result) {
            echo "Updated content for: {$post->post_title}\n";
            
            // Update ACF fields
            if (isset($data['fields'])) {
                foreach ($data['fields'] as $field => $value) {
                    update_field($field, $value, $post->ID);
                }
                echo "Updated fields for: {$post->post_title}\n";
            }
        }
    } else {
        echo "Project not found: {$slug}\n";
    }
}

echo "\nContent update complete!\n";