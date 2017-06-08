# absolute path to image folder
FOLDER="./photos"

# max height
WIDTH=500

# max width
HEIGHT=500

STARTDIR=$PWD
cd $FOLDER
echo "Before: "
du -sh .

for i in $( ls ); do
    convert $i -resize 500x500\> $i
done

echo "After: "
du -sh .
cd $STARTDIR