#!/bin/bash
# 替换placeholder图片为Wikimedia Commons图片

# 1. 鳊鱼 (Parabramis pekinensis) - 使用团头鲂图片替代，同属
sed -i '' 's|https://placehold.co/400x300/4A90D9/FFFFFF?text=鳊鱼|https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Megalobrama_amblycephala_Kasumigaura2.jpg/800px-Megalobrama_amblycephala_Kasumigaura2.jpg|g' index.html

# 2. 黑鱼 (Channa argus) - 乌鳢
sed -i '' 's|https://placehold.co/400x300/2C2C2C/FFFFFF?text=黑鱼|https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Channa_asiatica_red.jpg/800px-Channa_asiatica_red.jpg|g' index.html

# 3. 黄尾鲴 (Xenocypris davidi)  
sed -i '' 's|https://placehold.co/400x300/D9A44A/FFFFFF?text=黄尾鲴|https://upload.wikimedia.org/wikipedia/commons/7/74/%D0%92%D0%B5%D1%80%D1%85%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4_%28%D0%BB%D0%B0%D1%82._Chanodichthys_erythropterus%29.jpg|g' index.html

# 4. 银鲴 (Xenocypris argentea)
sed -i '' 's|https://placehold.co/400x300/C0C0C0/FFFFFF?text=银鲴|https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chanodichthys_mongolicus_from_the_Lake_Khanka.jpg/800px-Chanodichthys_mongolicus_from_the_Lake_Khanka.jpg|g' index.html

# 5. 长丰鲫 - 使用鲫鱼图片替代
sed -i '' 's|https://placehold.co/400x300/E8A5A5/FFFFFF?text=长丰鲫|https://upload.wikimedia.org/wikipedia/commons/6/6f/Carassius_gibelio_-_Wilhelma_01.jpg|g' index.html

# 6. 似鳊 - 使用餐条鱼图片替代
sed -i '' 's|https://placehold.co/400x300/5BA3E8/FFFFFF?text=似鳊|https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Hemiculter_leucisculus_Taijiang_National_Park.jpg/800px-Hemiculter_leucisculus_Taijiang_National_Park.jpg|g' index.html

# 7. 蛇鮈 (Saurogobio dabryi) - 使用类似鱼类替代
sed -i '' 's|https://placehold.co/400x300/8B4513/FFFFFF?text=蛇鮈|https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Hemibarbus_maculatus_Shanghai_Aquarium.jpg/800px-Hemibarbus_maculatus_Shanghai_Aquarium.jpg|g' index.html

echo "图片替换完成！"
