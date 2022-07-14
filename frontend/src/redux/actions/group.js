export const CREATE_GROUP = "CREATE_GROUP";
export const CREATE_GROUP_RESPONSE = "CREATE_GROUP_RESPONSE";
export const EDIT_GROUP = "EDIT_GROUP";
export const EDIT_GROUP_RESPONSE = "EDIT_GROUP_RESPONSE";
export const DELETE_GROUP = "DELETE_GROUP";
export const DELETE_GROUP_RESPONSE = "DELETE_GROUP_RESPONSE";
export const VIEW_GROUP = "VIEW_GROUP";
export const VIEW_GROUP_RESPONSE = "VIEW_GROUP_RESPONSE";
export const VIEW_GROUPS = "VIEW_GROUPS";
export const VIEW_GROUPS_RESPONSE = "VIEW_GROUPS_RESPONSE";

export const createGroup = (groupData) => ({
    type: CREATE_GROUP,
    groupData
});

export const createGroupResponse = (response) => ({
    type: CREATE_GROUP_RESPONSE,
    response
});

export const editGroup = (id, groupData) => ({
    type: EDIT_GROUP,
    id,
    groupData
});

export const editGroupResponse = (response) => ({
    type: EDIT_GROUP_RESPONSE,
    response
});

export const deleteGroup = (id) => ({
    type: DELETE_GROUP,
    id
});

export const deleteGroupResponse = (response) => ({
    type: DELETE_GROUP_RESPONSE,
    response
});

export const viewGroups = () => ({
    type: VIEW_GROUPS
});

export const viewGroupsResponse = (response) => ({
    type: VIEW_GROUPS_RESPONSE,
    response
});

export const viewGroup = (id) => ({
    type: VIEW_GROUP,
    id
});

export const viewGroupResponse = (response) => ({
    type: VIEW_GROUP_RESPONSE,
    response
});
