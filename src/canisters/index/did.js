export const idlFactory = ({ IDL }) => {
  const IndexerUpgradeArgs = IDL.Record({
    'user_count' : IDL.Opt(IDL.Nat32),
    'owner' : IDL.Opt(IDL.Principal),
  });
  const IndexerInitArgs = IDL.Record({
    'user_count' : IDL.Nat32,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
  });
  const CanisterArgs = IDL.Variant({
    'Upgrade' : IndexerUpgradeArgs,
    'Init' : IndexerInitArgs,
  });
  const MessageType = IDL.Variant({
    'Replace' : IDL.Null,
    'Delete' : IDL.Null,
    'Create' : IDL.Null,
    'Update' : IDL.Null,
  });
  const MessageSource = IDL.Record({
    'canister_id' : IDL.Principal,
    'resource_type' : IDL.Text,
    'resource_id' : IDL.Nat64,
  });
  const Message = IDL.Record({
    'payload_type' : IDL.Text,
    'msg_id' : IDL.Text,
    'msg_type' : MessageType,
    'msg_resource' : IDL.Opt(MessageSource),
    'timestamp' : IDL.Nat64,
    'caller' : IDL.Principal,
    'payload' : IDL.Vec(IDL.Nat8),
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const WalletReceiveResult = IDL.Record({ 'accepted' : IDL.Nat64 });
  return IDL.Service({
    '__get_candid_interface_tmp_hack' : IDL.Func([], [IDL.Text], ['query']),
    'get_history_message_list' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Nat64],
        [IDL.Vec(IDL.Tuple(Message, IDL.Principal))],
        ['query'],
    ),
    'get_message' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(IDL.Tuple(Message, IDL.Principal))],
        ['query'],
    ),
    'get_message_keys' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_message_list' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Nat64],
        [IDL.Vec(IDL.Tuple(Message, IDL.Principal))],
        ['query'],
    ),
    'get_message_list_by_pid' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Nat64, IDL.Nat64],
        [IDL.Vec(IDL.Tuple(Message, IDL.Principal))],
        ['query'],
    ),
    'get_message_size' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)), IDL.Nat64],
        ['query'],
    ),
    'receive_batch_messages' : IDL.Func([IDL.Vec(Message)], [Result], []),
    'receive_message' : IDL.Func([Message], [Result_1], []),
    'wallet_balance' : IDL.Func([], [IDL.Nat], ['query']),
    'wallet_receive' : IDL.Func([], [WalletReceiveResult], []),
  });
};
export const init = ({ IDL }) => {
  const IndexerUpgradeArgs = IDL.Record({
    'user_count' : IDL.Opt(IDL.Nat32),
    'owner' : IDL.Opt(IDL.Principal),
  });
  const IndexerInitArgs = IDL.Record({
    'user_count' : IDL.Nat32,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
  });
  const CanisterArgs = IDL.Variant({
    'Upgrade' : IndexerUpgradeArgs,
    'Init' : IndexerInitArgs,
  });
  return [IDL.Opt(CanisterArgs)];
};