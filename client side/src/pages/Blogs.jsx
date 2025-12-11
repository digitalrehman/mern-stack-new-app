import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Pencil, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const title = "Item with Image Media";

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
];

const Blogs = () => {
  let navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <div>
          <Button onClick={() => navigate("/add-blog")}>
            <Plus /> Add New Blog
          </Button>
        </div>
        <div className="flex w-full max-w-6xl flex-col gap-6 mt-4">
          <ItemGroup className="gap-4">
            {music.map((song) => (
              <Item
                asChild
                className="bg-background"
                key={song.title}
                variant="outline"
              >
                <a href="#">
                  <ItemMedia variant="image">
                    <img
                      alt={song.title}
                      className="object-cover grayscale"
                      height={32}
                      src="https://placehold.co/32x32"
                      width={32}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {song.title} -{" "}
                      <span className="text-muted-foreground">
                        {song.album}
                      </span>
                    </ItemTitle>
                    <ItemDescription>{song.artist}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription>{song.duration}</ItemDescription>
                    <ItemDescription>
                      <Button variant="outline" size={"icon"}>
                        <Pencil />
                      </Button>
                      <Button variant="outline" size={"icon"}>
                        <Trash />
                      </Button>
                    </ItemDescription>
                  </ItemContent>
                </a>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blogs;
