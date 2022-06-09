
export const fakeStories = [
    {
        title: "3 little pigs",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        tags: ["fairy tale", "allegory"],
        to: '/listener',
        _id: "0"
    },
    {
        title: "boy who cried woof",
        rating: 3.7,
        author: "stephenie meyer",
        length: 99432,
        tags: ["fairy tale", "children", "terror"],
        to: '/listener',
        _id: "1",
    }
]

export const fakeStories1 = [
    {
        title: "34 little pigsssssssssssssssssssssssssssssssssssssssssssss",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        tags: ["fairy tale", "allegory"],
        to: '/listener',
        _id: "2",
    },
    {
        title: "girl who cried woof",
        rating: 3.7,
        author: "fred meyer",
        length: 99432,
        tags: ["fairy tale", "children", "terror"],
        to: '/listener',
        _id: "3",
    }
]

export const fakeTags = [
    {
        name: "fairy tales",
        highest_bid: 0,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 999,
    },
    {
        name: "adventure",
        highest_bid: 24,
        highest_bidder_id: "steve",
        number_of_stories_with_tag: 10293,
    },
    {
        name: "suspense",
        highest_bid: 199,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 5,
    },
    {
        name: "clean",
        highest_bid: 3,
        highest_bidder_id: "mary",
        number_of_stories_with_tag: 19,
    },
    {
        name: "positive",
        highest_bid: 39429,
        highest_bidder_id: "sue",
        number_of_stories_with_tag: 24,
    },
    {
        name: "fairy tales",
        highest_bid: 0,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 999,
    },
    {
        name: "adventure",
        highest_bid: 24,
        highest_bidder_id: "steve",
        number_of_stories_with_tag: 10293,
    },
    {
        name: "suspense",
        highest_bid: 199,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 5,
    },
    {
        name: "clean",
        highest_bid: 3,
        highest_bidder_id: "mary",
        number_of_stories_with_tag: 19,
    },
    {
        name: "positive",
        highest_bid: 39429,
        highest_bidder_id: "sue",
        number_of_stories_with_tag: 24,
    },
]

export const fakeSearches = [
    "cat videos", "tails wagging",
    "fairy tales", "suspense",
    "ducks", "adventure",
    "hats", "superheroes"
]

export const fakeSubList = [ //? can to and _id be the same!?!
    { 
        name: "Mick Donald",
        _id: "abc",
        to: "/creatorProfile"
    },
    { 
        name: "Alice Cooper",
        _id: "def",
        to: "/creatorProfile"
    },
    { 
        name: "Imelda Hong",
        _id: "ghi",
        to: "/creatorProfile"
    },
]

export const fakeBaskets = [ //? can to and _id be the same!?!
    { name: "History", _id: "aaa", to: "/listenerPlaylist" },
    { name: "Fairy Tales", _id: "bbb", to: "/listenerPlaylist" },
    { name: "Children", _id: "ccc", to: "/listenerPlaylist" },
]

export const fakeQueue = [ //? can to and _id be the same!?!
    { name: "Once upon a Thyme", _id: "ddd", to: "/listenerSingleStory" },
    { name: "A Salt and Battery", _id: "eee", to: "/listenerSingleStory" },
    { name: "Lit Math Test", _id: "fff", to: "/listenerSingleStory" },
]

export async function loadStoriesByTag(tag, setter){
    const newStories = await fakeStories1;
    setter(newStories)
}