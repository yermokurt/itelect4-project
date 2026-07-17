import { User, Item, Claim, ItemStatus, CreateItemDTO, ItemUpdate, getLatestEntry } from '../types/appProject';

const projectName: string = "App Project:Lost and Found System";
const creator: string = "Kurt Yermo";

function greet(name: string): string {
    return `Welcome to ${name} by ${creator}!`;
}

function logMessage(message: string): void {
    console.log(message);
}

logMessage(greet(projectName));

function displayReport(user: User, item: Item): string {
    return `[REPORT] ${user.name} reported a ${item.title} located at ${item.location}.`;
}

// Declaration of variables for testing
const testUser: User = { id: 1, name: "Kurt", email: "kurt@project.com", role: "student", isActive: true };
const sampleItem: Item = { id: 1002, title: "Gym Bag", description: "Black Nike Bag", location: "Classroom", reportedByUserId: 1, status: ItemStatus.Lost };

console.log(displayReport(testUser, sampleItem));



// for Utility Type OMIT

let nextId: number = 1000;

function reportLostItem(data: CreateItemDTO): Item {
    // 1. Assign the current ID
    const currentId = nextId;

    // 2. Increment the ID for the next time this function is called
    nextId++;

    // 3. Construct the item
    const finalItem: Item = {
        id: currentId,
        ...data
    };

    console.log(`Reported: ${finalItem.title} with ID: ${finalItem.id}`);
    return finalItem;
}

const myItem = reportLostItem({
    title: "Blue Notebook",
    description: "Spiral bound, math notes inside",
    location: "Student Lounge",
    reportedByUserId: 1,
    status: ItemStatus.Lost
});

// for Utility Type Partial

function updateItem(itemId: number, updates: ItemUpdate): void {

    // We check if the update includes a status change using our Enum
    if (updates.status === ItemStatus.Found) {
        console.log(`Item ${itemId} has been found!`);
    } else if (updates.status === ItemStatus.Claimed) {
        console.log(`Item ${itemId} has been returned to its owner.`);
    } else {
        console.log(`Item ${itemId} was updated.`);
    }
}

updateItem(myItem.id, { status: ItemStatus.Found });

// for Generics (Generic Function is getLatestEntry)

const secondItem = reportLostItem({
    title: "Ballpen",
    description: "Red ink",
    location: "South Lounge",
    reportedByUserId: 1,
    status: ItemStatus.Lost
});

const thirdItem = reportLostItem({
    title: "Aquaflask",
    description: "Color red with scratch at the bottom",
    location: "Student Lounge",
    reportedByUserId: 1,
    status: ItemStatus.Lost
});

const allReportedItems: Item[] = [myItem, secondItem, thirdItem];

const latest = getLatestEntry(allReportedItems);
console.log(latest);

