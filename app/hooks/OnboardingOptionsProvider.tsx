'use client';

import React, {createContext, useContext, useState, useCallback} from 'react';

export type RequirementsMode = 'none' | 'exclude' | 'only';

export const REQUIREMENT_OPTIONS = [
  {label: 'Business type', value: 'business_type'},
  {label: 'Business profile URL', value: 'business_profile.url'},
  {
    label: 'Business profile description',
    value: 'business_profile.product_description',
  },
  {label: 'External account', value: 'external_account'},
  {label: 'ToS acceptance', value: 'tos_acceptance.*'},
  {label: 'Representative (all)', value: 'representative.*'},
  {label: 'Owners (all)', value: 'owners.*'},
  {label: 'Owners address', value: 'owners.address.*'},
  {label: 'Directors (all)', value: 'directors.*'},
  {label: 'Company tax ID', value: 'company.tax_id'},
  {label: 'Company address', value: 'company.address.*'},
  {label: 'Support details', value: 'support_details.*'},
];

type CollectionOptions = {
  fields: 'currently_due' | 'eventually_due';
  futureRequirements: 'omit' | 'include';
  requirements?: {exclude: string[]} | {only: string[]};
};

type IOnboardingOptionsContext = {
  requirementsMode: RequirementsMode;
  selectedRequirements: string[];
  setRequirementsMode: (mode: RequirementsMode) => void;
  setSelectedRequirements: (reqs: string[]) => void;
  getCollectionOptions: () => CollectionOptions | undefined;
  optionsKey: number;
};

const OnboardingOptionsContext = createContext<IOnboardingOptionsContext>({
  requirementsMode: 'none',
  selectedRequirements: [],
  setRequirementsMode: () => {},
  setSelectedRequirements: () => {},
  getCollectionOptions: () => undefined,
  optionsKey: 0,
});

export const useOnboardingOptions = () => useContext(OnboardingOptionsContext);

export const OnboardingOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [requirementsMode, setRequirementsModeState] =
    useState<RequirementsMode>('none');
  const [selectedRequirements, setSelectedRequirementsState] = useState<
    string[]
  >([]);
  const [optionsKey, setOptionsKey] = useState(0);

  const setRequirementsMode = useCallback((mode: RequirementsMode) => {
    setRequirementsModeState(mode);
    setOptionsKey((k) => k + 1);
  }, []);

  const setSelectedRequirements = useCallback((reqs: string[]) => {
    setSelectedRequirementsState(reqs);
    setOptionsKey((k) => k + 1);
  }, []);

  const getCollectionOptions = useCallback(():
    | CollectionOptions
    | undefined => {
    if (requirementsMode === 'none' || selectedRequirements.length === 0) {
      return undefined;
    }

    if (requirementsMode === 'exclude') {
      return {
        fields: 'currently_due',
        futureRequirements: 'omit',
        requirements: {exclude: selectedRequirements},
      };
    }

    return {
      fields: 'currently_due',
      futureRequirements: 'omit',
      requirements: {only: selectedRequirements},
    };
  }, [requirementsMode, selectedRequirements]);

  return (
    <OnboardingOptionsContext.Provider
      value={{
        requirementsMode,
        selectedRequirements,
        setRequirementsMode,
        setSelectedRequirements,
        getCollectionOptions,
        optionsKey,
      }}
    >
      {children}
    </OnboardingOptionsContext.Provider>
  );
};
