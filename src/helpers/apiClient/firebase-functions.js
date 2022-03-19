import { db, auth, provider } from "./firebase";

// User
export const loginFirebase = async () => {
  const userObject = await auth.signInWithPopup(provider);
  const { profile } = userObject.additionalUserInfo;
  return profile;
};

export const logoutFirebase = async () => {
  auth.signOut();
};

// Project
export const requestCreateProject = async (projectObject) => {
  const docRef = await db.collection("projects").add(projectObject);
  const docId = docRef.id;
  return docId;
};

export const requestGetUserProjects = async (email) => {
  const snapshot = await db
    .collection("projects")
    .where("email", "==", email)
    .get();
  const dataArray = [];
  snapshot.forEach((doc) => {
    dataArray.push({ ...doc.data(), id: doc.id });
  });
  return dataArray;
};

export const requestDeleteProject = async (projectID) => {
  const docRef = await db.collection("projects").doc(projectID);
  docRef.delete();
  const docRef2 = await db
    .collection("groups")
    .where("projectID", "==", projectID)
    .get();
  docRef2.forEach((doc) => {
    doc.ref.delete();
  });
  const docRef3 = await db
    .collection("endpoints")
    .where("projectID", "==", projectID)
    .get();
  docRef3.forEach((doc) => {
    doc.ref.delete();
  });
};

export const requestUpdateProject = async (id, newName) => {
  const docRef = await db.collection("projects").doc(id);
  docRef.update({ name: newName });
};

// Group + Endpoints
export const requestCreateGroup = async (groupObject) => {
  const docRef = await db.collection("groups").add(groupObject);
  const docId = docRef.id;
  return docId;
};

export const requestCreateEndpoint = async (endpointObject) => {
  const docRef = await db.collection("endpoints").add(endpointObject);
  const docId = docRef.id;
  // Return object id
  return docId;
};

export const requestGetProjectData = async (projectID) => {
  const snapshot1 = await db
    .collection("groups")
    .where("projectID", "==", projectID)
    .get();
  const groupsArray = [];
  snapshot1.forEach((doc) => {
    groupsArray.push({ ...doc.data(), id: doc.id });
  });
  const snapshot2 = await db
    .collection("endpoints")
    .where("projectID", "==", projectID)
    .get();
  const endpointsArray = [];
  snapshot2.forEach((doc) => {
    endpointsArray.push({ ...doc.data(), id: doc.id });
  });
  return [groupsArray, endpointsArray];
};

export const requestDeleteEndpoint = async (endpointID) => {
  const docRef = await db.collection("endpoints").doc(endpointID);
  docRef.delete();
};

export const requestDeleteGroup = async (groupID) => {
  const docRef = await db.collection("groups").doc(groupID);
  docRef.delete();
  const docRef2 = await db
    .collection("endpoints")
    .where("groupID", "==", groupID)
    .get();
  docRef2.forEach((doc) => {
    doc.ref.delete();
  });
};

export const requestUpdateEndpoint = async (id, updateObject) => {
  const docRef = await db.collection("endpoints").doc(id);
  docRef.update(updateObject);
};

export const requestUpdateGroup = async (id, updateObject) => {
  const docRef = await db.collection("groups").doc(id);
  docRef.update(updateObject);
};
