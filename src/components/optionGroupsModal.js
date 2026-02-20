'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function OptionGroupsInline({
  optionGroups,
  setOptionGroups
}) {

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Add a new option group
  const addOptionGroup = () => {
    setOptionGroups([
      ...optionGroups,
      {
        id: generateId(),
        groupName: '',
        isRequired: true,
        allowMultiple: false,
        items: [{ id: generateId(), name: '', price: 0 }]
      }
    ]);
  };

  // Remove an option group
  const removeOptionGroup = (groupId) => {
    setOptionGroups(optionGroups.filter(group => group.id !== groupId));
  };

  // Update group field
  const updateGroup = (groupId, field, value) => {
    setOptionGroups(
      optionGroups.map(group =>
        group.id === groupId ? { ...group, [field]: value } : group
      )
    );
  };

  // Add item to a group
  const addItemToGroup = (groupId) => {
    setOptionGroups(
      optionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              items: [...group.items, { id: generateId(), name: '', price: 0 }]
            }
          : group
      )
    );
  };

  // Remove item from a group
  const removeItemFromGroup = (groupId, itemId) => {
    setOptionGroups(
      optionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.filter(item => item.id !== itemId)
            }
          : group
      )
    );
  };

  // Update item in a group
  const updateItem = (groupId, itemId, field, value) => {
    setOptionGroups(
      optionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              )
            }
          : group
      )
    );
  };

  return (
    <div className="space-y-4 px-4">
      {/* Option Groups Header with Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Option Groups</h2>
        <div 
          className="bg-[#000000] text-white rounded-full px-3 py-2 cursor-pointer"
          onClick={addOptionGroup}
        >
          <button className="w-5 h-5 rounded-full border border-[#EDE7B5] flex items-center justify-center text-xs bg-transparent text-[#EDE7B5]">
            +
          </button>
        </div>
      </div>

      {/* Option Groups List */}
      {optionGroups.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-500 text-sm">
          No option groups added yet. Click + to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {optionGroups.map((group, groupIndex) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl p-4 space-y-4"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-semibold text-sm">Group {groupIndex + 1}</h3>
                {optionGroups.length > 1 && (
                  <button
                    onClick={() => removeOptionGroup(group.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Group Name */}
              <div>
                <label className="block text-xs font-semibold text-black mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  placeholder="Choose Protein"
                  value={group.groupName}
                  onChange={(e) =>
                    updateGroup(group.id, 'groupName', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Selection Type */}
              <div>
                <label className="block text-xs font-semibold text-black mb-2">
                  Selection Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={group.isRequired}
                      onChange={() => updateGroup(group.id, 'isRequired', true)}
                      className="w-4 h-4 cursor-pointer accent-gray-800"
                    />
                    <span className="text-xs">Required</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!group.isRequired}
                      onChange={() => updateGroup(group.id, 'isRequired', false)}
                      className="w-4 h-4 cursor-pointer accent-gray-800"
                    />
                    <span className="text-xs">Optional</span>
                  </label>
                </div>
              </div>

              {/* Customer Can Select */}
              <div>
                <label className="block text-xs font-semibold text-black mb-2">
                  Customer Can Select
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!group.allowMultiple}
                      onChange={() => updateGroup(group.id, 'allowMultiple', false)}
                      className="w-4 h-4 cursor-pointer accent-gray-800"
                    />
                    <span className="text-xs">Single Choice</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={group.allowMultiple}
                      onChange={() => updateGroup(group.id, 'allowMultiple', true)}
                      className="w-4 h-4 cursor-pointer accent-gray-800"
                    />
                    <span className="text-xs">Multiple Choices</span>
                  </label>
                </div>
              </div>

              {/* Group Items */}
              <div>
                <label className="block text-xs font-semibold text-black mb-2">
                  Group Items
                </label>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Tofu"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(group.id, item.id, 'name', e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <div className="relative w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          ₦
                        </span>
                        <input
                          type="number"
                          placeholder="2.00"
                          step="0.01"
                          min="0"
                          value={item.price || ''}
                          onChange={(e) =>
                            updateItem(
                              group.id,
                              item.id,
                              'price',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      {group.items.length > 1 && (
                        <button
                          onClick={() => removeItemFromGroup(group.id, item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-red-50 hover:border-red-300 transition"
                        >
                          <X size={16} className="text-gray-600" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Item Button */}
                <button
                  onClick={() => addItemToGroup(group.id)}
                  className="w-full mt-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={16} />
                  <span>Add an Item</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}