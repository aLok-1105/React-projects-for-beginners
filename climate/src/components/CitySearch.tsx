import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Loader2, Loader2Icon, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("");

  const { data: locations, isLoading } = useLocationSearch(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setquery}
          placeholder="Type a command or search..."
        />
        <CommandList>
          {query.length > 2 && isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

<CommandSeparator />
            {locations && locations.length > 0 && (
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {locations?.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
