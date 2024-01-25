export const downloadJsonFile = (events: IEvent[], id: string) => {
  const fileName = "event_" + id;
  const data = events.map((item) => {
    const { _id, user_id, ...rest } = JSON.parse(JSON.stringify(item));
    return rest;
  });

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
