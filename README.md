Campus Lost and Found
    - A simple lost and found tracker, wherein users can report items they lost or found around campus. There are two users, the student and the admin, the student can report items found or claim item that they have lost, and the admin can verify the claim request and update the status of the item.

Types and Interfaces Used:
    - Interfaces: User, Course, Submission
    - Enum: SubmissionStatus, and const enum Role
    - Generic: getFirst and getById

Utility Types: Partial, Pick, Omit, and Record

To run this program:

1. Run npm install to install dependencies.

2. Verify there are no TypeScript errors by running npx tsc --noEmit in the terminal.

3. Run the project using npx ts-node src/index.ts