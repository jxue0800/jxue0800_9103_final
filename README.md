# jxue0800_9103_final

**Major Project**

![individual work](assets/Individual%20work.png)


**Inspiration: Animation of Van Gogh's starry night**

![starry night](assets/starry%20night.png)


**Function I choose:**

Van Gogh's distinctive stippling style with a flowing effect like a line moving in a prolonged fashion. This inspired me to use perlin noise to drive the effect of rippling water on the surface of the sea in the abstract painting chosen by the group code.






**How was this accomplished?**

**The Group Gode**

1. Image loading and processing: The background and tower images are loaded in the preload function and resized in the setup function to create a graphical object containing a large number of lines as a background.

2. Dynamic Lines: The createLine function generates random line objects based on the image, the properties of these lines such as color, thickness and direction are taken from the image. The lines are stored in the lines array and are constantly updated and drawn in the draw function.

3. Animation loop: The draw function is executed every frame, updating and drawing the background image, the tower image, dynamic lines and waves to keep the screen changing and moving. The windowResized function adjusts the canvas and redraws the contents when the window size changes.








**Individual Code Wave Effect:**

 -Use Perlin noise to generate wave data, and draw multiple waves with different heights according to the noise data in draw function to achieve the effect of near big and far small waves. The waves cover the background and the randomly refreshed dynamic lines cover the waves to achieve a three-dimensional hierarchy, and the refreshing and extending of the lines enhances the visual effect of the wave ripples.
