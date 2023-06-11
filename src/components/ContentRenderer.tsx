type Props = {
  children: string;
};

export const ContentRenderer = ({ children }: Props) => {
  return (
    <article className='px-3 pb-4 text-sm text-stone-200 break-words' dangerouslySetInnerHTML={{ __html: children }} />
  );
};
